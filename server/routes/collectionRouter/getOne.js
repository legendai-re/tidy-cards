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
        if(!collection){
        	res.sendStatus(404);
        }else if(collection.visibility == visibility.PRIVATE && (!req.user || req.user._id!=collection._author)){
        	res.sendStatus(401);
        }else{
        	res.json({data: collection});
        }        
    })   
    
}