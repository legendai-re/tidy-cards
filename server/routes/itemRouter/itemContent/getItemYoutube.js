module.exports = function getItemYoutube (req, res) {

    var fs       = require("fs");
    var https    = require('https');
    var models   = require('../../../models');

    if(!req.query.video_id){
        res.status(400).send({ error: 'some required parameters was not provided'});
        res.end();
    }else{

        var videoId = req.query.video_id;

        var options = {
          host: 'www.googleapis.com',
          path: '/youtube/v3/videos?part=snippet&id=' + videoId + '&key=' + process.env.GOOGLE_API_KEY
        };

        var callback = function(response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                var response = JSON.parse(str);
                var itemYoutube = new models.ItemYoutube();
                itemYoutube.url = 'https://youtu.be/'+videoId;
                itemYoutube.embedUrl = 'https://www.youtube.com/embed/'+videoId + '?autoplay=1';
                itemYoutube.videoId = videoId;
                if(response.items && response.items[0])
                    itemYoutube.snippet = response.items[0].snippet;
                itemYoutube._user = req.user._id;
                itemYoutube.save(function(err){
                    if(err){console.log(err); return res.status(500)}
                    res.json({data: itemYoutube})
                })
            });

            response.on('error', function () {
                res.json({data: JSON.parse(str)})
            });
        };

       https.request(options, callback).end();

    }

}
