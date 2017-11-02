process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let server   = require('../server.js');
let models   = require('../models');
let chai     = require('chai');
let request  = require('supertest');

exports.server = server;
exports.models = models;
exports.chai = chai;
exports.request = request;
exports.should = chai.should();
exports.assert = chai.assert;
exports.cookies = null;
exports.testUsers = {
    test1: null,
    test2: null
}