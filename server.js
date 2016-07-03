var express 		= require('express');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var session 		= require('express-session');
var path 			= require('path');
var db 				= require('./server/mongoose');
var models			= require('./server/models');

var app = express();
app.set('port', (process.env.PORT || 2016));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "qfsfsdf5q4sfqsd4sdfqsf46q5s6d4f5q546FS864DAD",
    name: "invow",
    resave: true,
    saveUninitialized: true
}));

require('./server/passport')(app);
require('./server/routes')(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
