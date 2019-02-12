var express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

var app = express();
var http = require('http').Server(app);
var https = require('https');
var port = process.env.PORT || 4000;
var fs = require('fs');
var user_session = {};
var room_users = {}; //this is the big boy data base

var ssl = {
    key: fs.readFileSync('/etc/letsencrypt/live/cissa.com.au/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/cissa.com.au/fullchain.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/cissa.com.au/chain.pem')
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/static/index.html');
});


app.get('/committee', function(req, res){
  res.sendFile(__dirname + '/static/committee.html');
});


app.use('/', express.static('static/'));

http.listen(port, function(){
  console.log('listening on *:' + port);
});

https.createServer(ssl, app).listen(4443);

app.set('trust proxy', true);
app.set('trust proxy', 'loopback');
