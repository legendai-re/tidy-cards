module.exports = function getCurrentuser (req, res) {
	 res.json(req.user);
}