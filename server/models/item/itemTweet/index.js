var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ItemTweetSchema = require('./schema')(Schema);

ItemTweetSchema.pre('save', function(next) {
    this.createdAt = new Date();
    next();
});

ItemTweetSchema.pre('update', function(next) {
    this.updatedAt = Date();
});

ItemTweet = mongoose.model('ItemTweet', ItemTweetSchema);

exports.itemTweetModel = ItemTweet;
