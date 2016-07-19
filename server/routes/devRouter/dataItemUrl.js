module.exports = function (req, res) {

    var faker = require('faker');
    var connectionTypes = require('../../security/connectionTypes.json');
    var models          = require('../../models');

    models.ItemUrl.find(function(err, itemUrls){
        res.json(itemUrls);
    })

}
