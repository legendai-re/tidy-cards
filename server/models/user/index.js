var mongoose    = require('mongoose');
var roles       = require('../../security/roles.json');
var visibility  = require('../collection/visibility.json')
var Schema      = mongoose.Schema;

var UserSchema  = require('./schema')(Schema);

UserSchema.pre('save', function(next) {    
    this.createdAt = new Date();
    next();
});

UserSchema.pre('update', function(next) {    
    this.updatedAt = Date();
});

UserSchema.methods.isGranted = function isGranted(role){        
    if(this.haveRole(role)) return true;    
    return checkRole(this, role);
}

UserSchema.methods.haveRole = function haveRole(role){
    return this.roles.indexOf(role) > -1;
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

UserSchema.methods.addCollection = function addCollection(collection, callback) {
    collection._author = this._id;
    collection.save(function(err){
        if (err) {callback(err, collection); return;}                      
        callback(false, collection);
    });    
}

UserSchema.methods.addStarredCollection = function addStarredCollection(User, collection, callback) {

    if(this._id == collection._author || collection.visibility == visibility.PRIVATE){        
        callback('Cannot star you own collection or collection is private');
        return;
    }
    User.findById(this._id).select('+_starredCollections').exec(function(err, user){
        if(err){
            callback(err);
            return;
        }        
        for(var key in user._starredCollections){
            if(user._starredCollections[key] == collection._id){
                callback('Collection already starred.');
                return;
            }
        }                
        user._starredCollections.push(String(collection._id));
        user.save(function(err){
            if(err)callback(err);
            else callback(false);
        });
    })
}

User = mongoose.model('User', UserSchema);

exports.userModel = User;