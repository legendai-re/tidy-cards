var logger      = require('../../winston');
var visibility  = require('../../models/collection/visibility.json');
var lifeStates  = require('../../models/lifeStates.json');
var m           = require('../../models');
var mongodbid   = require('../../helpers/mongodbid');

module.exports = function getOne(collection_id, params, user, callback) {

    if(!mongodbid.isMongoId(collection_id))
        return callback(new m.ApiResponse(collection_id + ' is not a mongodb id', 404));

	var q = m.Collection.findById(collection_id);

	q.populate('_thumbnail');
    q.populate({
        path: '_author',
        populate: { path: '_avatar' }
    });

	q.exec(function(err, collection){
        if(err) {logger.error(err); return callback(new m.ApiResponse(err, 500))}
        if(!collection) {return callback(new m.ApiResponse('cannot find collection with id: '+collection_id, 404));}

        var _authorId = collection._author._id ? collection._author._id : collection._author;

        // if collection deleted or private and current user is not the author
        if((collection.lifeState != lifeStates.ACTIVE.id) ||  (collection.visibility == visibility.PRIVATE.id && (!user || String(user._id)!=_authorId))){
        	if(user){
                getStar(user, collection, function(err, star){
                    if(err) {logger.error(err); return callback(new m.ApiResponse(err, 500))}
                    return callback(new m.ApiResponse(null, 401, {_star: star}));
                })
            }else{
                return callback(new m.ApiResponse(null, 401, {_star: null}));
            }
        }else{
            getParents(collection, [], function(err, parentCollections){
                if(err) {logger.error(err); return callback(new m.ApiResponse(err, 500))}
                collection._parents = parentCollections;
                if(user){
                    getStar(user, collection, function(err, star){
                        if(err) {logger.error(err); return callback(new m.ApiResponse(err, 500))}
                        collection._star = star;
                        return callback(new m.ApiResponse(null, 200, collection));
                    })
                }else{
                    return callback(new m.ApiResponse(null, 200, collection));
                }
            })
        }
    })

}

function getParents(collection, result, callback){
    if(!collection._parent) return callback(null, result);
    m.Collection.findById(collection._parent, function(err, parentCollection){
        result.push(parentCollection);
        if(!parentCollection._parent) return callback(null, result);
        return getParents(parentCollection, result, callback);
    })
}

function getStar(user, collection, callback){
    m.Star.findOne({_user: user._id, _collection: collection._id}, function(err, star){
        if(err) {logger.error(err); callback(err, null);}
        callback(null, star);
    })
}