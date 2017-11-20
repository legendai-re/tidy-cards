module.exports = function getOne(req, res) {
	var visibility  = require('../../../models/collection/visibility.json');
    var lifeStates  = require('../../../models/lifeStates.json');
    var models      = require('../../../models');
    var mongodbid   = require('../../../helpers/mongodbid');

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
        if((collection.lifeState == lifeStates.ARCHIVED.id) ||  (collection.visibility == visibility.PRIVATE.id && (!req.user || String(req.user._id)!=_authorId))){        
            res.status(401);
            res.end();
        }else{
            res.render('collection/getOne', {
		        collection: collection,
		        env: process.env
		    });
        }
    })
}