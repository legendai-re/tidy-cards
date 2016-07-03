module.exports = function(app) {

	var express 	= require('express');
	var path 		= require('path');
	var authRouter = require('./authRouter');
	var userRouter = require('./userRouter');

	app.use('/app', express.static(path.resolve(__dirname, '../../build/app')));
	app.use('/assets', express.static(path.resolve(__dirname, '../../build/assets')));
	app.use('/css', express.static(path.resolve(__dirname, '../../build/css')));
	app.use('/styles', express.static(path.resolve(__dirname, '../../build/styles')));
	app.use('/config', express.static(path.resolve(__dirname, '../../build/config')));
	app.use('/node_modules', express.static(path.resolve(__dirname, '../../build/node_modules')));

	app.use('/auth', authRouter);
	app.use('/api/users', userRouter);

	app.get('/*', function(req, res) {		
		res.sendFile(path.resolve(__dirname, '../../build/index.html'));
	});  
}