if(process.env.NODE_ENV != "production"){
	require('dotenv').config();
}

var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack 			= require("webpack");
var express 			= require('express');
var cookieParser 		= require('cookie-parser');
var bodyParser 			= require('body-parser');
var session 			= require('express-session');
var Twitter             = require('twitter');
var path 				= require('path');
var db 					= require('./mongoose');
var models				= require('./models');

var app = express();
app.set('port', (process.env.PORT || 2016));

var compiler = webpack({

    output: { path: '/' }
});

app.use(webpackDevMiddleware(compiler, {
}));

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
  console.log('Node app is running on port', app.get('port'));
});
