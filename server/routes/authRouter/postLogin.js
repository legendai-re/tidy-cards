module.exports = function postLogin (req, res) {
	res.json({data: req.user});
}