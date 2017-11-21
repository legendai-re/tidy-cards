module.exports = function postLogin (req, res) {
    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
	res.json({data: req.user});
}
