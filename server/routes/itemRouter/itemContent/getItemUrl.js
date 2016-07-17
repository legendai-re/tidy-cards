module.exports = function getItemUrl (req, res) {

    var http = require('http');

    if(!req.query.host || !req.query.path){
        res.status(400).send({ error: 'some required parameters was not provided'});
        res.end();
    }else{
        var options = {
            host: req.query.host,
            path: decodeURIComponent(req.query.path)
        };
        callback = function(response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                var re = /<img\b[^>]+?src\s*=\s*['"]?([^\s'"?#>]+)/;
                var results = re.exec(str);
                var img="";
                if(results) img = results[1];
                if(img[0] == '/')
                    img = req.query.host + img;
                res.json({error: false, data: img});
            });
        }

        var request = http.request(options, callback);

        request.on('error', function(err) {
            res.json({error: true, data: null});
        });

        request.end();
    }

}
