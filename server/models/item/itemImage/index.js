var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ItemImageSchema = require('./schema')(Schema);

ItemImageSchema.pre('save', function(next) {
    if(!this.createdAt)
        this.createdAt = new Date();
    this.updatedAt = Date();
    next();
});

ItemImage = mongoose.model('ItemImage', ItemImageSchema);

exports.itemImageModel = ItemImage;
