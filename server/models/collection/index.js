var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var lifeStates  = require('../lifeStates.json');
var visibility  = require('./visibility.json');
var algoliaClient = require('../../algolia/algolia')
var algoliaCollectionIndex = algoliaClient.initIndex('ts_'+process.env.ALGOLIA_INDEX_PREFIX+'_collection');

var CollectionSchema = require('./schema')(Schema);

CollectionSchema.pre('save', function(next) {
    if(!this.createdAt)
        this.createdAt = new Date();
    this.updatedAt = Date();
    next();
});

CollectionSchema.post('save', function(collection) {
    if(collection.lifeState === lifeStates.ACTIVE.id && collection.visibility === visibility.PUBLIC.id) {
        algoliaIndex.addObject({
            objectID: collection._id,
            title: collection.title,
            bio: collection.bio
        }, function(err, content) {
            if(err)
                console.log(err)
        });
    }else{
        algoliaIndex.deleteObject(collection._id.toString(), function(err) {
            if(err)
                console.log(err);
        });
    }
});

/**
 * Add an item to a collection.
 * @function addItem
 * @param {Item} item - An object Item.
 * @param {requestCallback} callback - The callback that return the item.
 */
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
