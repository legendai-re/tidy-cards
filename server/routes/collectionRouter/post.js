module.exports = function post (req, res) {

    var visibility      = require('../../models/collection/visibility.json');
    var models          = require('../../models');

	if(!req.body.title || !req.body.color || !req.body.visibility || !visibilityOk(req.body.visibility)){
        res.status(400).send({ error: 'some required parameters was not provided'});
        res.end();
    }else{
        var collection =  new models.Collection();
        collection.title = req.body.title;
        collection.color = req.body.color;
        collection.visibility = req.body.visibility.id;
        if(req.body._thumbnail && req.body._thumbnail._id){
            collection._thumbnail = req.body._thumbnail._id;
        }
        if(req.body.bio){
            collection.bio = req.body.bio;
        }
        req.user.addCollection(collection, function(err, collection){
            if (err) {console.log(err); res.sendStatus(422); return;}
            res.json({'data': collection});
        });
    }


    function visibilityOk(reqVisibility){
        if(visibility[reqVisibility.id] != null)
            return true;
        return false;
    }
}
