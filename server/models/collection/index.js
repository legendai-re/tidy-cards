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

CollectionSchema.methods.addItem = function addItem(item, callback) {
    item._collection = this._id;
    item.save(function(err){
        if (err) {callback(err, iem); return;}
        callback(false, item);
    });
}

Collection = mongoose.model('Collection', CollectionSchema);

exports.collectionModel = Collection;
