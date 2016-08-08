module.exports = function getValidUsername (req, res) {

    var models      = require('../../models');
    var usernameValidator = require('../../helpers/user/usernameValidator');

    var rq = req.query;

    if(!rq.username){
        res.status(400).send({ error: 'some required parameters was not provided'});
        res.end();
    }else{
        if(!usernameValidator.isValid(rq.username)){
            return res.json({data: {isValid: false}});
        }

        var filterObj = req.user ? {username: rq.username.toLowerCase(),  _id: { $ne: req.user._id }} : {username: rq.username.toLowerCase()};

        models.User.findOne(filterObj, function(err, user){
            if(err) {console.log(err); res.sendStatus(500); return;}
            if(user) return res.json({data: {isValid: false}});
            return res.json({data: {isValid: true}});
        })
    }

}
