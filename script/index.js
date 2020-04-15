var express = require('express');
const nodemailer = require('nodemailer');

var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 4000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '../static/index.html');
});
app.get('/events', function(req, res){
  res.sendFile(__dirname + '../static/events.html');
});
app.get('/about', function(req, res){
  res.sendFile(__dirname + '../static/about.html');
});
app.get('/gallery', function(req, res){
  res.sendFile(__dirname + '../static/gallery.html');
});
app.get('/past-events', function(req, res){
  res.sendFile(__dirname + '../static/past_events.html');
});
app.get('/contact', function(req, res){
  res.sendFile(__dirname + '../static/contact.html');
});
app.get('/sponsors', function(req, res){
  res.sendFile(__dirname + '../static/sponsors.html');
});

app.use('/', express.static('../static/'));

http.listen(port, function(){
  console.log('listening on *:' + port);
});

app.set('trust proxy', true);
app.set('trust proxy', 'loopback');
