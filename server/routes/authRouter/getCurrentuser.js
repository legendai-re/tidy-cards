module.exports = function getCurrentuser (req, res) {
	 res.json({data: req.user.webpath});
}