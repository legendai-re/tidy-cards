if(process.env.NODE_ENV != "production"){
	require('dotenv').config();
}

var express 			= require('express');
var cookieParser 		= require('cookie-parser');
var bodyParser 			= require('body-parser');
var session 			= require('express-session');
var db 					= require('./mongoose');
var controllers         = require('./controllers');

var app = express();
app.set('port', (process.env.PORT || 2016));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    resave: true,
    saveUninitialized: true
}));

require('./security')(app);
require('./routes')(app);

app.listen(app.get('port'), function() {
  console.log('TidyCards is running on port', app.get('port'));
})
