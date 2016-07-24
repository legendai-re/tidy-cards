var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ItemSchema = require('./schema')(Schema);

ItemSchema.pre('save', function(next) {
    if(!this.createdAt)
        this.createdAt = new Date();
    this.updatedAt = Date();
    next();
});

Item = mongoose.model('Item', ItemSchema);

exports.itemModel = Item;
