var mongoose    = require('mongoose');
var _           = require('lodash');
var roles       = require('../passport/roles.json');
var Schema      = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String ,
        select: false      
    },
    email: {
        type: String
    },
    roles: {
        type: Array
    },
    name: {
        type: String
    }
});

UserSchema.methods.isGranted = function isGranted(toFound){        
    if(this.haveRole(toFound)){          
        return true;
    }
    return checkRole(this, toFound);
}

UserSchema.methods.haveRole = function haveRole(role){
    return this.roles.indexOf(role) > -1;
}

UserSchema.methods.addRole = function addRole(role, callback) {
    if(!this.haveRole(role)){
        this.roles.push(role);
        this.save(function(err){
            if(err)throw err;
            callback({success: true, alert: "Role "+ role + " added."});
        })       
    }else{
        callback({success: false, alert: "Role already exist"});
    }
}

UserSchema.methods.removeRole = function removeRole(role, callback) {
    if(this.haveRole(role) && role != "ROLE_USER"){
        var index = this.roles.indexOf(role);
        this.roles.splice(index, 1);
        this.save(function(err){
            if(err)throw err;
            callback({success: true, alert: "Role "+ role + " removed."});
        })       
    }else{
        callback({success: false, alert: "Role didn't exist or you tryed to remove ROLE_USER"});
    }
}

function checkRole(user, toFound){
    for(role in roles){
        if((roles[role].indexOf(toFound) > -1)){
            if(user.haveRole(role))return true;
            else return checkRole(user, role);            
        }
    }
    return false;
}

User = mongoose.model('User', UserSchema);

exports.userModel = User;