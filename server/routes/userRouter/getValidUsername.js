module.exports = function getValidUsername (req, res) {

    var models      = require('../../models');
    var usernameValidator = require('../../helpers/username-validator');

    var rq = req.query;

    if(!rq.username){
        res.status(400).send({ error: 'some required parameters was not provided'});
        res.end();
    }else{
        if(!usernameValidator.isValid(rq.username)){
            return res.json({data: {isValid: false}});
        }
        models.User.findOne({username: rq.username.toLowerCase()}, function(err, user){
            if(err) {console.log(err); res.sendStatus(500); return;}
            if(user) return res.json({data: {isValid: false}});
            return res.json({data: {isValid: true}});
        })
    }

}
