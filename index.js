var express = require('express'),
    app = require('express')(),
    config = require('./config.json'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    path= require('path'),
    passport= require('passport'),
    VKontakteStrategy = require('passport-vkontakte').Strategy,
    VK = require('vksdk'),
    mysql = require('mysql'),
    async = require('async'),
    SessionStore = require('express-mysql-session'),

    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session');


// connect to db
  var connection = mysql.createConnection('mysql://'+config.connection.user+':'+config.connection.password+'@'+config.connection.host+'/'+config.connection.db);
  connection.connect();

// init app

  app.set('view engine', 'ejs');  //tell Express we're using EJS
  app.use(cookieParser());

  var sessionStore = new SessionStore({}, connection);

  app.use(session({
      key: 'MUSIC',
      secret: 'music app',
      store: sessionStore,
      resave: true,
      saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/js', express.static(__dirname + '/js'));
  app.use('/site', express.static(__dirname + '/site'));
  app.use('/fonts', express.static(__dirname + '/fonts'));
  app.set('views', __dirname + '/views');

  http.listen(config.port, function(){
      console.log('listening on *:' + config.port);
  });





// vk sdk api
  var vk = new VK({
   'appId'     : config.vk.clientID,
   'appSecret' : config.vk.clientSecret,
   'language'  : 'ru',
   'secure'    : true
  });



// passport CONFIG
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    connection.query('SELECT * from user where id = ?', [id], function(err, user) {
      if (user.length) {
        vk.setToken(user[0].token);
        done(err, user[0]);
      } else {
        done(err, null);
      }

    });
  });

  passport.use(new VKontakteStrategy(config.vk,
    function(accessToken, refreshToken, profile, done) {

      connection.query('SELECT * from user where vk_id = ?', [profile.id], function(err, user) {
        if (err) throw err;

        if (user.length) {

            connection.query('UPDATE user SET ? where id = ?', [{token: accessToken}, user[0].id], function(err, result) {
              if (err) throw err;

              connection.query('SELECT * from user where id = ?', [user[0].id], function(err, user) {
                if (err) throw err;
                return done(null, user[0]);
               });
            });

            return done(null, user[0]);
        } else {

            connection.query('INSERT INTO user SET ?', {vk_id: profile.id, fio: profile.displayName, token: accessToken, photo: profile._json.photo}, function(err, result) {
              if (err) throw err;

              connection.query('SELECT * from user where id = ?', [result.insertId], function(err, user) {
                if (err) throw err;
                return done(null, user[0]);
               });
            });
        }
      });
    }
  ));


// routes
  app.get('/auth/vkontakte',
    passport.authenticate('vkontakte', { scope: ['audio'] }),
    function(req, res){
      // The request will be redirected to vk.com for authentication, so
      // this function will not be called.
    });

  app.get('/auth/vkontakte/callback',
    passport.authenticate('vkontakte', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

  app.get('/search', isLoggedIn, function(req, res){
    vk.request('audio.search', {q: req.query.q, search_own: 1}, function(_o) {

      var items = _o.response.items;

      for (var i = 0; i <= items.length - 1; i++) {
        items[i].id = 'id_' + items[i].id;
      }

        res.send(items);
    });
  });


  app.post('/get_own_list', isLoggedIn, function(req, res){

    // res.send([]);

  	vk.request('audio.get', {count: 300}, function(_o) {

  		var items = _o.response.items;

  		for (var i = 0; i <= items.length - 1; i++) {
  			items[i].id = 'id_' + items[i].id;
  		}

  	    res.send(items);
  	});
  });

  app.get('/get_lirics', isLoggedIn, function(req, res){
    vk.request('audio.getLyrics', {lyrics_id: req.query.lyrics_id}, function(_o) {
      res.send(_o.response.text);
    });
  });



  app.get('/', isLoggedIn, function(req, res) {

    var user = req.user;
        delete user.token;

    async.parallel({
        playlist: function(callback){
          connection.query('SELECT * from playlist order by pos', function(err, playlist) {
            var plays = [];

            for (var i = 0; i <= playlist.length - 1; i++) {
              var audio = JSON.parse(playlist[i].object);

              audio.current = playlist[i].current;

              if (playlist[i].user) {
                var us = JSON.parse(playlist[i].user);
                audio.user_id = us.id;
                audio.fio = us.fio;
              }

              plays.push(audio);
            }
            callback(null, plays);
          });
        },
    },
    function(err, results) {
        // results is now equals to: {one: 1, two: 2}
        res.render('client', {
          user: user,
          playlist: results.playlist
        });
    });
  });

  app.get('/admin', isLoggedIn, function(req, res) {

    var user = req.user;
        delete user.token;

    async.parallel({
        playlist: function(callback){
          connection.query('SELECT * from playlist order by pos', function(err, playlist) {
            var plays = [];

            for (var i = 0; i <= playlist.length - 1; i++) {
              var audio = JSON.parse(playlist[i].object);

              audio.current = playlist[i].current;

              if (playlist[i].user) {
                var us = JSON.parse(playlist[i].user);
                audio.user_id = us.id;
                audio.fio = us.fio;
              }

              plays.push(audio);
            }
            callback(null, plays);
          });
        },
    },
    function(err, results) {
        // results is now equals to: {one: 1, two: 2}
        res.render('index', {
          user: user,
          playlist: results.playlist
        });
    });
  });

  app.get('/login', function(req, res){
    res.render('login');
  });

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}



io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('add to playlist', function(audio, user){

        connection.query('INSERT INTO playlist SET ?', {audio_id: audio.id, object: JSON.stringify(audio), user: JSON.stringify(user)}, function(err, result) {
          if (err) throw err;
          audio.user_id = user.id;
          audio.fio = user.fio;
          io.emit('add to playlist', audio);
        });
    });

    socket.on('remove from playlist', function(audio, index){
        connection.query('DELETE FROM playlist WHERE audio_id = ?', [audio.id], function(err, result) {
          if (err) throw err;
          // console.log(audio);
          io.emit('remove from playlist', audio, index);
        });
    });

    socket.on('set current', function(audio_id){
      async.waterfall([
          function(callback) {
            connection.query('UPDATE playlist SET current = 0', function(err, result) {
              if (err) throw err;
              callback(null, result);
            });
          },
          function(result, callback) {
            connection.query('UPDATE playlist SET current = 1 where audio_id = ?', [audio_id], function(err, result) {
              if (err) throw err;
              io.emit('set current', audio_id);
              callback(null, 'done');
            });
          },
      ], function (err, result) {
        console.log(result);
      });
    });

    socket.on('sort', function(data, playlist) {
      for (var i = data.length - 1; i >= 0; i--) {
        connection.query('UPDATE playlist SET pos = ? where audio_id = ?', [data[i].position, data[i].id]);
      }


      io.emit('sort', data, playlist);
    });

    socket.on('shuffle', function(index, playlist) {

      connection.query('UPDATE playlist SET pos = 0', function(err, result) {
        if (err) throw err;
        for (var i = 0; i <= playlist.length - 1; i++) {
          connection.query('UPDATE playlist SET pos = ? where audio_id = ?', [i, playlist[i].id]);
        }
      });
      io.emit('shuffle', index, playlist);
    });

});
