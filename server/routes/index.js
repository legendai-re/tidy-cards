module.exports = function(app) {

    var express             = require('express');
    var path                = require('path');
    var authRouter          = require('./authRouter');
    var userRouter          = require('./userRouter');
    var collectionRouter    = require('./collectionRouter');
    var imageRouter         = require('./imageRouter');
    var itemRouter          = require('./itemRouter');

    app.use('/fonts', express.static(path.resolve(__dirname, '../../dist/fonts')));
    app.use('/css', express.static(path.resolve(__dirname, '../../dist/css')));
    app.use('/img', express.static(path.resolve(__dirname, '../../dist/img')));
    app.use('/js', express.static(path.resolve(__dirname, '../../dist/js')));

    app.use('/auth', authRouter);

    app.use('/api/users', userRouter);
    app.use('/api/collections', collectionRouter);
    app.use('/api/images', imageRouter);
    app.use('/api/items', itemRouter);

    app.get('/*', function(req, res) {
        res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
    });
}
