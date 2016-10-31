var async           = require('async');
var lifeStates      = require('../../models/lifeStates.json');
var sortTypes       = require('../../models/customSort/sortTypes.json');
var itemTypes       = require('../../models/item/itemTypes.json');
var models          = require('../../models');
var itemController  = require('../itemController');

function init(_itemController){
    itemController = _itemController;
}

/**
 * Recursive function to delete a collection. It's recursive because it can
 * be called again in deleteItem() (from itemController) when the item type is COLLECTION.
 */
function deleteCollection(user, collectionId, callback){
    models.Collection.findById(collectionId).exec(function(err, collection){
        if(err) {console.log(err); return callback({error_code: 500, error: err});}
        if(!collection) {return callback({error_code: 400, error: "cannot find collection with id: "+collectionId });}
        if(collection._author!=user._id) {return callback({error_code: 401, error: "only the author of the collection can delete it" });}
        if(collection.lifeState == lifeStates.ARCHIVED.id) return callback(null);

        collection.lifeState = lifeStates.ARCHIVED.id;
        collection.save(function(err){
            if (err) {console.log(err); return callback({error_code: 500, error: err});}

            var isRoot = (collection.depth == 0);

            if(!isRoot)
                deleteRelatedItem(user, collection);

            deleteItems(user, collection, function(err){
                if(err) return callback({error_code: 500, error: err});

                if(isRoot){
                    removeCollectionFromCustomSort(collection, function(err){
                        return callback(err);
                    });
                }else{
                    return callback(null, {message: "The collection have been successfully deleted"});
                }
            });
        })
    });
}

/**
 * Delete the related item, only called if the collection is a subcollection
 */
function deleteRelatedItem(user, collection){
    models.Item.findOne({type: itemTypes.COLLECTION.id, _content: collection._id}, function(err, item){
        if(err) return console.error(err);
        itemController.deleteItem(user, item._id, function(err){
            if(err) return console.error(err);
        })
    })
}

/**
 * Retrieve all items of a collection and then delete them asynchronously.
 */
function deleteItems(user, collection, callback){
    models.Item.find({_collection: collection._id}, function(err, items){
        async.times(items.length, function(n, next) {
            itemController.deleteItem(user, items[n]._id, function(err){
                if(err) next(err);
                else next(null);
            })
        }, function(err, results) {
            if(err) console.log(err);
            callback(err);
        });
    });
}

/**
 * Retrieve the MY_COLLECTION customSort and remove the id of the collection inside it.
 */
function removeCollectionFromCustomSort(collection, callback){
    models.CustomSort.findOne({ _user: collection._author, type: sortTypes.MY_COLLECTIONS.id}, function(err, customSort){
        if(err) {console.log(err); return callback(err);}
        models.CustomSort.update({ _id: customSort._id},{ $pull: { ids: collection._id } }, function(err, result){
            if(err) {console.log(err);}
            return callback(err);
        })
    })
}

module.exports = {
    deleteCollection: deleteCollection,
    init: init
}
