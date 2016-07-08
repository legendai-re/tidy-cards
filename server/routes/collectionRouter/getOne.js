module.exports = function getOne (req, res) {

	var mongoose	= require('mongoose');
	var Collection	= mongoose.model('Collection');

	var rq = req.query;

	var q = Collection.findById(req.params.collection_id);	

	if(rq.populate){		
		q.populate(rq.populate);
	}

	q.exec(function(err, collection){                
        if(err) {console.log(err); res.sendStatus(500); return;}
        res.json({data: collection});
    })
    
}