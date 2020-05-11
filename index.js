var express = require('express');
const nodemailer = require('nodemailer');

var FB = require('fb');
FB.options({version: 'v6.0'});

var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 4000;



app.get('/api-cj', function(req,res){
  FB.api(
    '/243471740089969/videos',
    'GET',
    {access_token:'EAADgzgjeDx8BANPAnK9BxkYsw07bPbkEwFBSwPVg159IL846dVHyZAoZA0auSZBLhcMsm1behnWxkFPAssLjKOGaeu4GuAhrPtCmZCxO5GyiiRU2b0VO9D9ActCv5b9v72gY2mRZCJujZCd9stUQ2mQ2ZClhOZAnSgCFr5Bxo0FMcQZDZD',
    fields:'description,embed_html,title'},
    function(response) { 
      if (!response || response.error) {
        res.
        status(404).send({error:'Unable to fetch data'});
      }else{
        res.status(200).send(response.data)
      }
    }
  );
});


app.get('/api', function(req,res){
  FB.api(
    '/1678235912453132/events',
    'GET',
    {access_token:'EAADgzgjeDx8BANPAnK9BxkYsw07bPbkEwFBSwPVg159IL846dVHyZAoZA0auSZBLhcMsm1behnWxkFPAssLjKOGaeu4GuAhrPtCmZCxO5GyiiRU2b0VO9D9ActCv5b9v72gY2mRZCJujZCd9stUQ2mQ2ZClhOZAnSgCFr5Bxo0FMcQZDZD',
    fields:'id,cover,description,start_time,name,place'},
    function(response) { 
      if (!response || response.error) {
        res.status(404).send({error:'Unable to fetch data'});
      }else{
        res.status(200).send(response.data)
      }
    }
  );
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/static/index.html');
});
app.get('/events', function(req, res){
  res.sendFile(__dirname + '/static/events.html');
});
app.get('/about', function(req, res){
  res.sendFile(__dirname + '/static/about.html');
});
app.get('/gallery', function(req, res){
  res.sendFile(__dirname + '/static/gallery.html');
});
app.get('/past-events', function(req, res){
  res.sendFile(__dirname + '/static/past_events.html');
});
app.get('/contact', function(req, res){
  res.sendFile(__dirname + '/static/contact.html');
});
app.get('/sponsors', function(req, res){
  res.sendFile(__dirname + '/static/sponsors.html');
});
app.get('/codejam', function(req, res){
  res.sendFile(__dirname + '/static/codejam.html');
});


app.use('/', express.static('static/'));

http.listen(port, function(){
  console.log('listening on *:' + port);
});

app.set('trust proxy', true);
app.set('trust proxy', 'loopback');
