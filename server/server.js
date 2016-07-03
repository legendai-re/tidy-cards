var express 		= require('express');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var session 		= require('express-session');
var path 			= require('path');
var db 				= require('./mongoose');
var models			= require('./models');

var port = process.env.PORT || 2016;
var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "qfsfsdf5q4sfqsd4sdfqsf46q5s6d4f5q546FS864DAD",
    name: "invow",
    resave: true,
    saveUninitialized: true
}));

require('./passport')(app);
require('./routes')(app);

var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});