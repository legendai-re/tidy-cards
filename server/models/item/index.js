var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ItemSchema = require('./schema')(Schema);

ItemSchema.pre('save', function(next) {
    this.createdAt = new Date();
    next();
});

ItemSchema.pre('update', function(next) {
    this.updatedAt = Date();
});

Item = mongoose.model('Item', ItemSchema);

exports.itemModel = Item;
