module.exports = function getLogout(req, res) {
	req.logout();
    res.json({'success': true, 'alert': 'User loged out'});
}