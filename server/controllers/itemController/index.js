var lifeStates      = require('../../models/lifeStates.json');
var sortTypes       = require('../../models/customSort/sortTypes.json');
var itemTypes       = require('../../models/item/itemTypes.json');
var models          = require('../../models');
var collectionController = require('../collectionController');

/**
 * Delete an item and decrement the attribute itemsCount of the related collection.
 */
function deleteItem(user, itemId, callback){
    models.Item.findById(itemId).populate('_collection').exec(function(err, item){
        if(err) {console.error(err); return callback({error_code: 500, error: err});}
        if(!item) {return callback({error_code: 400, error: "cannot find item with id: "+req.params.item_id });}
        if(item._collection._author!=user._id) {return callback({error_code: 401, error: "only the author of the collection can remove item" });}
        if(item.lifeState == lifeStates.ARCHIVED.id) return callback(null);

        checkIfCollectionType(user, item, function(err){
            if(err) {console.error(err); return callback(err);}

            item.lifeState = lifeStates.ARCHIVED.id;

            item.save(function(err){
                if(err) {console.error(err); return callback({error_code: 500, error: err});}
                removeItemFromCustomSort(item, callback);
            });

            models.Collection.findById(item._collection, function(err, collection){
                if(err) console.error(err);
                collection.itemsCount--;
                collection.save();
            })

        })
    });
}

/**
 * Check if the item have COLLECTION as type, if yes then delete the related collection.
 */
function checkIfCollectionType(user, item, callback){
    if(item.type == itemTypes.COLLECTION.id){
        collectionController.deleteCollection(user, item._content, function(err){
            callback(err);
        })
    }else{
        callback(null);
    }
}

/**
 * Retrieve the customSort object related to collection that contain the item passed
 * as parameter. Then remove the itemId from the list of ids.
 */
function removeItemFromCustomSort(item, callback){
    models.CustomSort.findOne({ _collection: item._collection._id, type: sortTypes.COLLECTION_ITEMS.id}, function(err, customSort){
        if (err) {console.log(err); return callback({error_code: 500, error: err});}
        models.CustomSort.update({ _id: customSort._id},{ $pull: { ids: item._id } }, function(err, result){
            if (err) {console.log(err); return callback({error_code: 500, error: err});}
            return callback(null, item);
        })
    })
}

module.exports = {
    deleteItem: deleteItem
}
