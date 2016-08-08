var mongoose = require('mongoose');
var forbiddenUsernames = require('./forbiddenUsernames');

var isValid = function(username){
    return (isValidFormat(username) && !isForbidden(username) && !isMongoId(username))
}

function isForbidden(username){
    return forbiddenUsernames.indexOf(username.toLowerCase()) > -1;
}

function isMongoId(username){
    return new RegExp("^[0-9a-fA-F]{24}$").test(username);
}

function isValidFormat(username){
    return new RegExp('^([0-9a-zA-Z-_.]{2,20})+$').test(username);
}

module.exports = {
    isValid: isValid
}
