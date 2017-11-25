module.exports = function getOne (req, res) {

	var visibility  = require('../../models/collection/visibility.json');
    var lifeStates  = require('../../models/lifeStates.json');
    var models      = require('../../models');
    var mongodbid   = require('../../helpers/mongodbid');

	var rq = req.query;

    if(!mongodbid.isMongoId(req.params.collection_id))
        return res.status(404).send({ error: req.params.collection_id + ' is not a mongodb id'});

	var q = models.Collection.findById(req.params.collection_id);

	q.populate('_thumbnail');
    q.populate({
        path: '_author',
        populate: { path: '_avatar' }
    });

	q.exec(function(err, collection){
        if(err) {console.log(err); res.sendStatus(500); return;}
        if(!collection) return res.status(404).send({ error: 'cannot find collection with id: '+req.params.collection_id});

        var _authorId = collection._author._id ? collection._author._id : collection._author;

        // if collection deleted or private and current user is not the author
        if((collection.lifeState != lifeStates.ACTIVE.id) ||  (collection.visibility == visibility.PRIVATE.id && (!req.user || String(req.user._id)!=_authorId))){
        	if(req.user){
                getStar(req.user, collection, function(err, star){
                    if(err) {console.log(err); res.sendStatus(500); return;}
                    res.status(401);
                    res.json({data: {_star: star}});
                })
            }else{
                res.status(401);
                res.json({data: {_star: null}});
            }
        }else{
            getParents(collection, [], function(err, parentCollections){
                if(err) {console.log(err); res.sendStatus(500); return;}
                collection._parents = parentCollections;
                if(req.user){
                    getStar(req.user, collection, function(err, star){
                        if(err) {console.log(err); res.sendStatus(500); return;}
                        collection._star = star;
                        res.json({data: collection});
                    })
                }else{
                    res.json({data: collection});
                }
            })
        }
    })

    function getParents(collection, result, callback){
        if(!collection._parent) return callback(null, result);
        models.Collection.findById(collection._parent, function(err, parentCollection){
            result.push(parentCollection);
            if(!parentCollection._parent) return callback(null, result);
            return getParents(parentCollection, result, callback);
        })
    }

    function getStar(user, collection, callback){
        models.Star.findOne({_user: user._id, _collection: collection._id}, function(err, star){
            if(err)callback(err, null);
            callback(null, star);
        })
    }
}
