var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path= require('path');
var passport= require('passport');
var VKontakteStrategy = require('passport-vkontakte').Strategy;
var VK = require('vksdk');
var mysql      = require('mysql');

var cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session');


app.set('view engine', 'ejs');  //tell Express we're using EJS
app.use(cookieParser());
app.use(session({secret: 'music', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());



app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});

var connection = mysql.createConnection('mysql://root:@localhost/music');
connection.connect();

var vk = new VK({
   'appId'     : 4935725,
   'appSecret' : 'K2U90rURV6lJ0jN1Wx7n',
   'language'  : 'ru'
});
vk.setSecureRequests(true);


// used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    connection.query('SELECT * from user where id = ?', [id], function(err, user) {
      vk.setToken(user[0].token);
      done(err, user[0]);
    });
  });

passport.use(new VKontakteStrategy({
    clientID:     '4935725', // VK.com docs call it 'API ID'
    clientSecret: 'K2U90rURV6lJ0jN1Wx7n',
    callbackURL:  "http://192.168.0.228:3000/auth/vkontakte/callback"
  },
  function(accessToken, refreshToken, profile, done) {

    connection.query('SELECT * from user where id = ?', [profile.id], function(err, user) {
      if (err) throw err;

      if (user.length) {
          return done(null, user[0]);
      } else {

          connection.query('INSERT INTO user SET ?', {vk_id: profile.id, fio: profile.displayName, token: accessToken}, function(err, result) {
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


app.get('/auth/vkontakte',
  passport.authenticate('vkontakte'),
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




app.get('/search', function(req, res){
  vk.request('audio.search', {q: req.query.q}, function(_o) {

    var items = _o.response.items;

    for (var i = 0; i <= items.length - 1; i++) {
      items[i].id = 'id_' + items[i].id;
    }

      res.send(items);
  });
});


app.post('/get_own_list', function(req, res){

	vk.request('audio.get', {}, function(_o) {

		var items = _o.response.items;

		for (var i = 0; i <= items.length - 1; i++) {
			items[i].id = 'id_' + items[i].id;
		}

	    res.send(items);
	});
});


app.get('/', isLoggedIn, function(req, res){
  res.render('index', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}


app.use('/js', express.static(__dirname + '/js'));
app.use('/site', express.static(__dirname + '/site'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.set('views', __dirname + '/views');

http.listen(3000, function(){
  	console.log('listening on *:3000');
});


io.on('connection', function(socket){
  	console.log('a user connected');



  	socket.on('add to playlist', function(audio){
        connection.query('INSERT INTO playlist SET ?', {object: JSON.stringify(audio)}, function(err, result) {
          if (err) throw err;

          console.log(audio);
          io.emit('add to playlist', audio);
        });


  	});
});

// route for logging out
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
