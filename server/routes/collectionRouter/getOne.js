module.exports = function getOne (req, res) {

	var visibility  = require('../../models/collection/visibility.json');
    var lifeStates  = require('../../models/lifeStates.json');
    var models      = require('../../models');

	var rq = req.query;

	var q = models.Collection.findById(req.params.collection_id);
    q.where('lifeState').equals(lifeStates.ACTIVE.id);

	q.populate('_thumbnail');
    q.populate({
        path: '_author',
        populate: { path: '_avatar' }
    });

	q.exec(function(err, collection){
        if(err) {console.log(err); res.sendStatus(500); return;}
        if(!collection) return res.status(404).send({ error: 'cannot find collection with id: '+req.params.collection_id});

        var _authorId = collection._author._id ? collection._author._id : collection._author;
        if(collection.visibility == visibility.PRIVATE.id && (!req.user || String(req.user._id)!=_authorId)){
        	res.sendStatus(401);
        }else{
        	res.json({data: collection});
        }
    })

}
