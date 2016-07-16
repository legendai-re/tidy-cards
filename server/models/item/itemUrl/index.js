var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ItemUrlSchema = require('./schema')(Schema);

ItemUrlSchema.pre('save', function(next) {
    this.createdAt = new Date();
    next();
});

ItemUrlSchema.pre('update', function(next) {
    this.updatedAt = Date();
});

ItemUrl = mongoose.model('ItemUrl', ItemUrlSchema);

exports.itemUrlModel = ItemUrl;
