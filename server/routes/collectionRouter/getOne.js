module.exports = function getOne (req, res) {

	var mongoose	= require('mongoose');
	var visibility  = require('../../models/collection/visibility.json');
	var Collection	= mongoose.model('Collection');

	var rq = req.query;

	var q = Collection.findById(req.params.collection_id);	

	if(rq.populate){		
		q.populate(rq.populate);
	}

	q.exec(function(err, collection){
        if(err) {console.log(err); res.sendStatus(500); return;}
        var _authorId = collection._author._id ? collection._author._id : collection._author;
        if(!collection){
        	res.sendStatus(404);
        }else if(collection.visibility == visibility.PRIVATE && (!req.user || String(req.user._id)!=_authorId)){
        	res.sendStatus(401);
        }else{
        	res.json({data: collection});
        }        
    })   
    
}