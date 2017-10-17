var express         = require('express');
var isGranted       = require('../../security/isGranted');

var router = express.Router();

router.route('/generate-content')
    .post(isGranted('ROLE_ADMIN'), function(req, res) {
        require('./generateContent')(req, res);
    });

router.route('/data-item-url')
    .get(isGranted('ROLE_ADMIN'), function(req, res) {
        require('./dataItemUrl')(req, res);
    });

router.route('/delete-all-but-users')
    .delete(isGranted('ROLE_ADMIN'), function(req, res) {
        require('./deleteAllButUsers')(req, res);
    });

router.route('/add-algolia-indexes')
    .get(isGranted('ROLE_ADMIN'), function(req, res) {
        require('./addAlgoliaIndexes')(req, res);
    });

module.exports = router;
