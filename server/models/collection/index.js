var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var CollectionSchema = require('./schema')(Schema);

CollectionSchema.pre('save', function(next) {    
    this.createdAt = new Date();
    next();
});

CollectionSchema.pre('update', function(next) {    
    this.updatedAt = Date();
});

Collection = mongoose.model('Collection', CollectionSchema);

exports.collectionModel = Collection;