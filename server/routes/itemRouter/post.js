module.exports = function post (req, res) {

    var mongoose        = require('mongoose');
    var itemTypes       = require('../../models/item/itemTypes.json');
    var Collection      = mongoose.model('Collection');
    var Item            = mongoose.model('Item');

    if(!req.body.title || !req.body.description || !req.body._collection || !req.body.type || !typeOk(req.body.type)){
        res.status(400).send({ error: 'some required parameters was not provided'});
        res.end();
    }else{
        var item =  new Item();
        item.title = req.body.title;
        item.description = req.body.description;
        item.type = req.body.type;
        Collection.findById(req.body._collection, function(err, collection){
            if (err) {console.log(err); res.sendStatus(500); return;}
            if (!collection){res.status(400).send({ error: "cannot find collection with id: "+req.body._collection }); return;}
            if(collection._author!=req.user._id) {res.status(401).send({ error: "only the author of the collection can add item" }); return;}
            collection.addItem(item, function(err, item){
                if(err) {console.log(err); res.sendStatus(500); return;}
                res.json({data: item});
            });
        });
    }

    function typeOk(typeId){
        for(var key in itemTypes){
            if(itemTypes[key]==typeId)
                return true;
        }
        return false;
    }
}
