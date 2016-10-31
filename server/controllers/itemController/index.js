var lifeStates      = require('../../models/lifeStates.json');
var sortTypes       = require('../../models/customSort/sortTypes.json');
var models          = require('../../models');
var collectionController = require('../collectionController');

function deleteItem(user, itemId, callback){
    models.Item.findById(itemId).populate('_collection').exec(function(err, item){
        if(err) {console.log(err); return callback({error_code: 500, error: err});}
        if(!item) {return callback({error_code: 400, error: "cannot find item with id: "+req.params.item_id });}
        if(item._collection._author!=user._id) {return callback({error_code: 401, error: "only the author of the collection can remove item" });}

        if(item.type == itemTypes.COLLECTION.id){
            collectionController.deleteCollection(user, item._content, function(err){
                item.lifeState = lifeStates.ARCHIVED.id;

                item.save(function(err){
                    if(err) {console.log(err); return callback({error_code: 500, error: err});}
                    removeItemFromCustomSort(item, callback);
                });

                models.Collection.findById(item._collection, function(err, collection){
                    if(err) console.log(err);
                    collection.itemsCount--;
                    collection.save();
                })
            });
        }
    });
}

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
