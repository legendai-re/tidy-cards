var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ItemImageSchema = require('./schema')(Schema);

ItemImageSchema.pre('save', function(next) {
    this.createdAt = new Date();
    next();
});

ItemImageSchema.pre('update', function(next) {
    this.updatedAt = Date();
});

ItemImage = mongoose.model('ItemImage', ItemImageSchema);

exports.itemImageModel = ItemImage;
