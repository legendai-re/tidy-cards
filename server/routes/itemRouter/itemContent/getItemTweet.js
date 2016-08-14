module.exports = function getItemTweet (req, res) {

    var fs       = require("fs");
    var https    = require('https');
    var models   = require('../../../models');

    if(!req.query.tweet_url){
        res.status(400).send({ error: 'some required parameters was not provided'});
        res.end();
    }else{

        var tweetUrl = req.query.tweet_url;

        var options = {
          host: 'publish.twitter.com',
          path: '/oembed?format=json&url='+ encodeURI(tweetUrl)
        };

        var callback = function(response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                var response = JSON.parse(str);
                var itemTweet = new models.ItemTweet();
                itemTweet.url = response.url;
                itemTweet.html = response.html;
                itemTweet.author_name = response.author_name;
                itemTweet.author_url = response.author_url;
                itemTweet.width = response.width;
                itemTweet.height = response.height;
                itemTweet.type = response.type;
                itemTweet.provider_name = response.provider_name;
                itemTweet.version = response.version;
                itemTweet._user = req.user._id;
                itemTweet.save(function(err){
                    if(err){console.log(err); return res.status(500)}
                    res.json({data: itemTweet})
                })
            });

            response.on('error', function () {
                res.json({data: JSON.parse(str)})
            });
        };

       https.request(options, callback).end();

    }

}
