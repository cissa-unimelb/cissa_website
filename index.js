var express = require('express');
const nodemailer = require('nodemailer');

var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 4000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/events', function(req, res){
  res.sendFile(__dirname + '/public/events.html');
});
app.get('/about', function(req, res){
  res.sendFile(__dirname + '/public/about.html');
});
app.get('/gallery', function(req, res){
  res.sendFile(__dirname + '/public/gallery.html');
});
app.get('/past-events', function(req, res){
  res.sendFile(__dirname + '/public/past_events.html');
});
app.get('/contact-us', function(req, res){
  res.sendFile(__dirname + '/public/contact.html');
});
app.get('/sponsors', function(req, res){
  res.sendFile(__dirname + '/public/sponsors.html');
});

app.use('/', express.static('static/'));

http.listen(port, function(){
  console.log('listening on *:' + port);
});

app.set('trust proxy', true);
app.set('trust proxy', 'loopback');