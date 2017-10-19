module.exports = function getLogout(req, res) {
    req.session.cookie.maxAge = 0;
    req.session.destroy(function (err) {
    	req.logout();
    	res.sendStatus(200);
  	});
}
