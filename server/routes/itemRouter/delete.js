module.exports = function (req, res) {

    var itemController  = require('../../controllers/itemController');

    itemController.deleteItem(req.user, req.params.item_id, function(err){
        if(err)
            res.json({success: false, error: err});
        else
            res.json({success: true});
    })

}
