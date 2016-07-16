var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ItemYoutubeSchema = require('./schema')(Schema);

ItemYoutubeSchema.pre('save', function(next) {
    this.createdAt = new Date();
    next();
});

ItemYoutubeSchema.pre('update', function(next) {
    this.updatedAt = Date();
});

ItemYoutube = mongoose.model('ItemYoutube', ItemYoutubeSchema);

exports.itemYoutubeModel = ItemYoutube;
