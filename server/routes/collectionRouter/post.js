module.exports = function post (req, res) {

	var mongoose		= require('mongoose');
	var Collection 		= mongoose.model('Collection');
	
	if(!req.body.title || !req.body.color){
        res.sendStatus(400);
        res.end();
    }else{       
        var collection =  new Collection();
        collection.title = req.body.title;
        collection.color = req.body.color;        
        req.user.addCollection(collection, function(err, collection){
            if (err) {console.log(err); res.sendStatus(422); return;}            
            res.json({'data': collection});            
        });
    }         
}