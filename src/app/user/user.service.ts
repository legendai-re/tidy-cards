import { Injectable } from '@angular/core';

export class User {

	_id: string;
    username: string;
    name: string;
    email: string;
    password: string;
    roles: string[];

    constructor(
    	_id?: string,
	    username?: string,
	    name?: string,
	    email?: string,
        password?: string,
	    roles?: string[]) { 
    	this._id = _id;
    	this.username = username;
    	this.name = name;
    	this.email = email;
        this.password = password;
    	this.roles = roles;
    }

    public static createFormJson(obj){
    	return new User(obj._id, obj.username, obj.name, obj.email, obj.password, obj.roles);
    }

    isGranted(role: string){
        var roles = require('../../../server/security/roles.json');
        if(this.haveRole(role)) return true;    
        return this.checkRole(this, role, roles);
    }

    haveRole(role){
        return this.roles.indexOf(role) > -1;
    }

    private checkRole(user, toFound, roles){
        for(var role in roles){
            if((roles[role].indexOf(toFound) > -1)){
                if(user.haveRole(role))return true;
                else return this.checkRole(user, role, roles);            
            }
        }
        return false;
    }
}

