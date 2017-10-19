module.exports = function getOne (req, res) {
	var request = require('request');

	if(req.query && req.query.url)
    	request.get(req.query.url).pipe(res);
    else
    	res.sendStatus(400);
}