module.exports = function (req, res) {

    var faker = require('faker');
    var async = require('async');
    var connectionTypes = require('../../security/connectionTypes.json');
    var models          = require('../../models');

    async.series([
        function(callback){
            models.User.remove( { email : { $nin: ["olivier28.coue@gmail.com", "hello@alexandrejolly.com", "mr.ylloj@gmail.com", "accounts@alexandrejolly.com"] } }, function(err){
                callback(null, 'user')
            });
        },
        function(callback){
             models.Collection.remove({}, function(err){
                callback(null, 'collection')
             });
        },
        function(callback){
            models.Image.remove({}, function(err){
                callback(null, 'image')
            })
        },
        function(callback){
            models.Item.remove({}, function(err){
                callback(null, 'item')
            })
        },
        function(callback){
            models.ItemImage.remove({}, function(err){
                callback(null, 'utemUrl')
            })
        },
        function(callback){
           models.ItemYoutube.remove({}, function(err){
                callback(null, 'itemYoutube')
           })
        },
        function(callback){
            models.ItemTweet.remove({}, function(err){
                callback(null, 'itemTweet')
            })
        },
        function(callback){
            models.Star.remove({}, function(err){
                callback(null, 'star')
            })
        }],
        function(err, results){
            res.json({message: 'done'});
        }
    )

}
