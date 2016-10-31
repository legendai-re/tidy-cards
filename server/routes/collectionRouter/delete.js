module.exports = function (req, res) {

    var collectionController = require('../../controllers/collectionController');

    collectionController.deleteCollection(req.user, req.params.collection_id, function(err, message){
        if(err)
            res.json({success: false, error: err});
        else
            res.json({success: true});
    });

}
