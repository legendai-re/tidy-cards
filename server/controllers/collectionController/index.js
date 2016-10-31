var lifeStates      = require('../../models/lifeStates.json');
var sortTypes       = require('../../models/customSort/sortTypes.json');
var itemTypes       = require('../../models/item/itemTypes.json');
var models          = require('../../models');
var itemController  = require('../itemController');

function deleteCollection(user, collectionId, callback){
    models.Collection.findById(collectionId).exec(function(err, collection){
        if(err) {console.log(err); return callback({error_code: 500, error: err});}
        if(!collection) {return callback({error_code: 400, error: "cannot find collection with id: "+collectionId });}
        if(collection._author!=user._id) {return callback({error_code: 401, error: "only the author of the collection can delete it" });}
            collection.lifeState = lifeStates.ARCHIVED.id;
            collection.save(function(err){
                if (err) {console.log(err); return callback({error_code: 500, error: err});}

                removeItems(user, collection, function(err){
                    if(err) return callback({error_code: 500, error: err});

                    /* remove the collection from custom sort done for a root collection */
                    if(collection.depth == 0){
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

function removeItems(user, collection, callback){
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
    deleteCollection: deleteCollection
}
