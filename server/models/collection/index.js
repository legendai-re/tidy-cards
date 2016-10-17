var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var lifeStates  = require('../lifeStates.json');

var CollectionSchema = require('./schema')(Schema);

CollectionSchema.pre('save', function(next) {
    if(!this.createdAt)
        this.createdAt = new Date();
    this.updatedAt = Date();
    next();
});

CollectionSchema.methods.addItem = function addItem(item, callback) {
    item._collection = this._id;
    item.save(function(err){
        if (err) {callback(err, item); return;}
        callback(false, item);
    });
    this.itemsCount++;
    this.save(function(err){
    });
}

Collection = mongoose.model('Collection', CollectionSchema);

exports.collectionModel = Collection;
