var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path= require('path');
var VK = require('vksdk');

var vk = new VK({
   'appId'     : 4935725,
   'appSecret' : 'K2U90rURV6lJ0jN1Wx7n',
   'language'  : 'ru'
});

vk.setSecureRequests(true);
vk.setToken('14466cdda54cf6c46aa8a0f07e66bc0fc31ad54e46bd65fa6f927f692129281e3e4c3c8cf3a3efaa6bbff');


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


app.get('/', function(req, res){
  	res.sendFile(__dirname + '/index.html');
});

app.use('/js', express.static(__dirname + '/js'));
app.use('/site', express.static(__dirname + '/site'));
app.use('/fonts', express.static(__dirname + '/fonts'));

http.listen(3000, function(){
  	console.log('listening on *:3000');
});


io.on('connection', function(socket){
  	console.log('a user connected');

  	socket.on('add to playlist', function(audio){
  		console.log(audio);
  	    io.emit('add to playlist', audio);
  	});
});
