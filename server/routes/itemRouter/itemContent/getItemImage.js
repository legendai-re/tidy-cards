module.exports = function getItemImage (req, res) {

    var fs       = require("fs");
    var https    = require('https');
    var models   = require('../../../models');

    if(!req.query.image_url){
        res.status(400).send({ error: 'some required parameters was not provided'});
        res.end();
    }else{
        var imageUrl = req.query.image_url;
        var itemImage = new models.ItemImage();
        itemImage.url = decodeURIComponent(imageUrl);
        itemImage._user = req.user._id;
        itemImage.save(function(err){
            if(err){console.log(err); return res.status(500)}
            res.json({data: itemImage})
        })

    }

}
