module.exports = function post (req, res) {

	var mongoose		= require('mongoose');
    var visibility      = require('../../models/collection/visibility.json');
	var Collection 		= mongoose.model('Collection');

	if(!req.body.title || !req.body.color || !req.body.visibility || !visibilityOk(req.body.visibility)){
        res.status(400).send({ error: 'some required parameters was not provided'});
        res.end();
    }else{
        var collection =  new Collection();
        collection.title = req.body.title;
        collection.color = req.body.color;
        collection.visibility = req.body.visibility;
        if(req.body._thumbnail && req.body._thumbnail._id){
            collection._thumbnail = req.body._thumbnail._id;
        }
        req.user.addCollection(collection, function(err, collection){
            if (err) {console.log(err); res.sendStatus(422); return;}
            res.json({'data': collection});
        });
    }


    function visibilityOk(visibilityId){
        for(var key in visibility){
            if(visibility[key].id==visibilityId)
                return true;
        }
        return false;
    }
}
