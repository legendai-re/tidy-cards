var async           = require('async');
var logger          = require('../../winston');
var lifeStates      = require('../../models/lifeStates.json');
var sortTypes       = require('../../models/customSort/sortTypes.json');
var itemTypes       = require('../../models/item/itemTypes.json');
var m               = require('../../models');
var itemController  = require('../itemController');

function init(_itemController){
    itemController = _itemController;
}

/**
 * Recursive function to delete a collection. It's recursive because it can
 * be called again in deleteItem() (from itemController) when the item type is COLLECTION.
 */
function deleteOne(user, collectionId, callback){
    m.Collection.findById(collectionId).exec(function(err, collection){
        if(err) {logger.error(err); return callback(new m.ApiResponse(err, 500));}
        if(!collection) {return callback(new m.ApiResponse("cannot find collection with id: "+collectionId, 400));}
        if(collection._author!=user._id) {return callback(new m.ApiResponse("only the author of the collection can delete it", 401));}
        if(collection.lifeState == lifeStates.ARCHIVED.id) return callback(new m.ApiResponse(null, 200));

        collection.lifeState = lifeStates.ARCHIVED.id;
        collection.save(function(err){
            if(err) {logger.error(err); return callback(new m.ApiResponse(err, 500));}

            var isRoot = (collection.depth == 0);

            if(!isRoot)
                deleteRelatedItem(user, collection);

            deleteItems(user, collection, function(err){
                if(err) {logger.error(err); return callback(new m.ApiResponse(err, 500));}

                if(isRoot){
                    removeCollectionFromCustomSort(collection, function(err){
                        if(err) {logger.error(err); return callback(new m.ApiResponse(err, 500));}
                        return callback(new m.ApiResponse(null, 200));
                    });    
                }else{
                    return callback(new m.ApiResponse(null, 200));
                }
            });
        })
    });
}

/**
 * Delete the related item, only called if the collection is a subcollection
 */
function deleteRelatedItem(user, collection){
    m.Item.findOne({type: itemTypes.COLLECTION.id, _content: collection._id}, function(err, item){
        if(err) return logger.error(err);
        itemController.deleteOne(user, item._id, function(apiResponse){
            if(apiResponse.err) return logger.error(apiResponse.err);
        })
    })
}

/**
 * Retrieve all items of a collection and then delete them asynchronously.
 */
function deleteItems(user, collection, callback){
    m.Item.find({_collection: collection._id}, function(err, items){
        async.times(items.length, function(n, next) {
            itemController.deleteOne(user, items[n]._id, function(apiResponse){
                if(apiResponse.err) next(apiResponse.err);
                else next(null);
            })
        }, function(err, results) {
            if(err) logger.error(err);
            callback(err);
        });
    });
}

/**
 * Retrieve the MY_COLLECTION customSort and remove the id of the collection inside it.
 */
function removeCollectionFromCustomSort(collection, callback){
    m.CustomSort.findOne({ _user: collection._author, type: sortTypes.MY_COLLECTIONS.id}, function(err, customSort){
        if(err) {logger.error(err); return callback(err);}
        m.CustomSort.update({ _id: customSort._id},{ $pull: { ids: collection._id } }, function(err, result){
            if(err) {logger.error(err);}
            return callback(err);
        })
    })
}

module.exports = {
    deleteOne: deleteOne,
    init: init
}