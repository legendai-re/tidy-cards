module.exports = function(app) {

	var express 	= require('express');
	var path 		= require('path');
	var authRouter = require('./authRouter');
	var userRouter = require('./userRouter');

	app.use('/css', express.static(path.resolve(__dirname, '../../dist/css')));
	app.use('/img', express.static(path.resolve(__dirname, '../../dist/img')));
	app.use('/js', express.static(path.resolve(__dirname, '../../dist/js')));

	app.use('/auth', authRouter);
	app.use('/api/users', userRouter);

	app.get('/*', function(req, res) {		
		res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
	});  
}