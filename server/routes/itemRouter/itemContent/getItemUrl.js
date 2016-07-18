module.exports = function getItemUrl (req, res) {

    var http            = require('http');
    var jsdom           = require('jsdom');
    var mongoose        = require('mongoose');
    var ItemUrl         = mongoose.model('ItemUrl');

    if(!req.query.host){
        res.status(400).send({ error: 'some required parameters was not provided'});
        res.end();
    }else{
        var path = req.query.path ? req.query.path : '';

        jsdom.env(
            'http://'+req.query.host+decodeURIComponent(path),
            ["http://code.jquery.com/jquery-3.1.0.slim.min.js"],
            function (err, window) {
                if(err){
                    res.json({error: true, data: null});
                }else{
                    var $ = window.$;
                    var itemUrl = new ItemUrl();

                    img = $('meta[property="og:image"]').attr("content");
                    if(img == '' || img == null || img == undefined){
                        img = $('img:first').attr("src");
                        if(img != null && img != '' && img != undefined){
                            if(!(img.substring(0, 7) == 'http://' || img.substring(0, 8) == 'https://')){
                                if(img[0] == '/')
                                    img = req.query.host + img;
                                else
                                    img = req.query.host + '/' + img;
                            }
                        }
                    }
                    if(img != null && img != '' && img != undefined){
                        if(!(img.substring(0, 7) == 'http://' || img.substring(0, 8) == 'https://')){
                            itemUrl.image = 'http://' + img;
                        }else{
                            itemUrl.image = img;
                        }
                    }

                    itemUrl.title = $('meta[property="og:title"]').attr("content");
                    if(itemUrl.title == '' || itemUrl.title == null || itemUrl.title == undefined)
                        itemUrl.title = $('meta[name="title"]').attr("content");

                    itemUrl.description = $('meta[property="og:description"]').attr("content");
                    if(itemUrl.description == '' || itemUrl.description == null || itemUrl.description == undefined)
                        itemUrl.title = $('meta[name="description"]').attr("content");

                    itemUrl.author = $('meta[name="author"]').attr("content");
                    if(itemUrl.author == '' || itemUrl.author == null || itemUrl.author == undefined)
                        itemUrl.author = $('meta[property="article:author"]').attr("content");

                    itemUrl.type = $('meta[property="og:type"]').attr("content");
                    itemUrl.site_name = $('meta[property="og:site_name"]').attr("content");

                    itemUrl.host = req.query.host;
                    res.json({error: false, data: itemUrl});
                }
            }
        );

    }

}
