var express = require('express');
const nodemailer = require('nodemailer');

var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 4000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/committee', function(req, res){
  res.sendFile(__dirname + '/public/committee.html');
});

app.use('/', express.static('static/'));

http.listen(port, function(){
  console.log('listening on *:' + port);
});

app.set('trust proxy', true);
app.set('trust proxy', 'loopback');
