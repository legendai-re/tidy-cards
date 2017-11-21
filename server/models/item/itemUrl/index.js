var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ItemUrlSchema = require('./schema')(Schema);

ItemUrlSchema.pre('save', function(next) {
    if(!this.createdAt)
        this.createdAt = new Date();
    this.updatedAt = Date();
    next();
});

ItemUrl = mongoose.model('ItemUrl', ItemUrlSchema);

exports.itemUrlModel = ItemUrl;
