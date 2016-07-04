import { Injectable } from '@angular/core';

export class User {

	_id: string;
    username: string;
    name: string;
    email: string;
    roles: string[];

    constructor(
    	_id: string,
	    username: string,
	    name: string,
	    email: string,
	    roles: string[]) { 
    	this._id = _id;
    	this.username = username;
    	this.name = name;
    	this.email = email;
    	this.roles = roles;
    }

    public static createFormJson(obj){
    	return new User(obj._id, obj.username, obj.name, obj.email, obj.roles);
    }

    hello(){
    	console.log("ca marche");
    }
}

