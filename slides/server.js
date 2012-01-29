
var fs = require('fs');
var express = require('express');

var port = 8081;
var app = express.createServer();

app.configure(function() {
  app.use(express.static(__dirname)),
  app.use(function(req, res) {
    res.redirect('/index.html');
  })
});


app.listen(port);
console.log('Listening on %d', port);