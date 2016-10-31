module.exports = function(app) {

    var express             = require('express');
    var path                = require('path');
    var authRouter          = require('./authRouter');
    var userRouter          = require('./userRouter');
    var collectionRouter    = require('./collectionRouter');
    var imageRouter         = require('./imageRouter');
    var itemRouter          = require('./itemRouter');
    var starRouter          = require('./starRouter');
    var resetRouter         = require('./resetRouter');
    var rolesRouter         = require('./rolesRouter');
    var languageRouter      = require('./languageRouter');
    var devRouter           = require('./devRouter');

    app.use('/', express.static(path.resolve(__dirname, '../../dist')));

    app.use('/auth', authRouter);

    app.use('/api/users', userRouter);
    app.use('/api/collections', collectionRouter);
    app.use('/api/images', imageRouter);
    app.use('/api/items', itemRouter);
    app.use('/api/stars', starRouter);
    app.use('/api/reset', resetRouter);
    app.use('/api/roles', rolesRouter);
    app.use('/api/languages', languageRouter);

    app.use('/api/dev', devRouter);

    app.get('/*', function(req, res) {
        res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
    })

}
