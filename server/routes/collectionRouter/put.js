module.exports = function put (req, res) {

	var mongoose	= require('mongoose');
	var Collection	= mongoose.model('Collection');

    q = Collection.findById(req.params.collection_id).populate('_author');

	q.exec(function(err, collection) {
        if (err) {console.log(err); res.sendStatus(500); return;}
        if(!collection) {res.status(404).send({ error: 'cannot find collection with id: '+req.params.collection_id}); return;}
        if(collection._author._id.equals(req.user._id) || req.user.isGranted('ROLE_ADMIN')){
            collection.title = (req.body.title || collection.title);
            collection.color = (req.body.color || collection.color);
            collection.bio = (req.body.bio || collection.bio);
            collection._thumbnail = (req.body._thumbnail && req.body._thumbnail._id) ? req.body._thumbnail._id : collection._thumbnail;
            collection.save(function(err) {
                if (err) {console.log(err); res.sendStatus(500); return;}
                res.json({data: collection});
            });
        }else{
        	res.sendStatus(401);
        }
    });

}
