var common  = require('../common');
let server  = common.server;
let models  = common.models;
let chai    = common.chai;
let request = common.request;
let should  = common.should;
let assert  = common.assert;

describe('GET /api/users/test', () => {
    it('it should make 404 error', (done) => {
        request(server)
            .get('/api/users/test')
            .expect(404, done)
    });
});

describe('PUT /api/users/test', () => {
    it('it should make 401 error', (done) => {
        request(server)
            .put('/api/users/test')
            .expect(401, done)
    });
});

describe('PUT /api/users/:id', () => {
    it('it should update name, language and bio of user test1', (done) => {
        var req = request(server).put('/api/users/'+common.testUsers.test1.data._id);
        req.cookies = common.testUsers.test1.cookies;
        req.send({name: 'Test 1', bio: 'I\'m test1', language: 'fr'})
        req.expect(200)
        .expect(response => {
            assert.equal(response.body.data.name, 'Test 1');
            assert.equal(response.body.data.bio, 'I\'m test1');
            assert.equal(response.body.data.username, 'test1');
            assert.equal(response.body.data.email, 'test1@test.com');
            assert.equal(response.body.data.language, 'fr');
        })
        .end(done);
    });
});

function tryInvalidUsername(invalidUsername){
    describe('PUT /api/users/:id', () => {
        it('it should try to update username and return error 422', (done) => {
            var req = request(server).put('/api/users/'+common.testUsers.test1.data._id);
            req.cookies = common.testUsers.test1.cookies;
            req.send({username: invalidUsername})
            req.expect(422)
            .end(done);
        });
    });
}

var invalidUsernames = ['a', 'test2', 'TeSt2', 'é*/dqdq', 'tidycards', "&=)éà'çéà\"'"];

for(var i in invalidUsernames)
    tryInvalidUsername(invalidUsernames[i])

describe('PUT /api/users/:id', () => {
    it('it should update username', (done) => {
        var req = request(server).put('/api/users/'+common.testUsers.test1.data._id);
        req.cookies = common.testUsers.test1.cookies;
        req.send({username: 'test1Updated'})
        req.expect(200)
        .expect(response => {
            assert.equal(response.body.data.username, 'test1Updated');
        })
        .end(done);
    });
});

describe('PUT /api/users/:id', () => {
    it('it should try to update email and return error 500', (done) => {
        var req = request(server).put('/api/users/'+common.testUsers.test1.data._id);
        req.cookies = common.testUsers.test1.cookies;
        req.send({email: 'hello'})
        req.expect(500)
        .end(done);
    });
});

describe('PUT /api/users/:id', () => {
    it('it should try to update email and return error 422', (done) => {
        var req = request(server).put('/api/users/'+common.testUsers.test1.data._id);
        req.cookies = common.testUsers.test1.cookies;
        req.send({email: common.testUsers.test2.data.email})
        req.expect(422)
        .end(done);
    });
});

describe('PUT /api/users/:id', () => {
    it('it should update email', (done) => {
        var req = request(server).put('/api/users/'+common.testUsers.test1.data._id);
        req.cookies = common.testUsers.test1.cookies;
        req.send({email: 'test1Updated@test.com'})
        req.expect(200)
        .expect(response => {
            assert.equal(response.body.data.email, 'test1updated@test.com');
        })
        .end(done);
    });
});

describe('GET /api/users/:id', () => {
    it('it should get user test1 updated', (done) => {
        var req = request(server).get('/api/users/'+common.testUsers.test1.data._id);
        req.expect(200)
        .expect(response => {
            assert.equal(response.body.data.name, 'Test 1');
            assert.equal(response.body.data.bio, 'I\'m test1');
            assert.equal(response.body.data.username, 'test1Updated');
            assert.equal(response.body.data.email, 'test1updated@test.com');
        })
        .end(done);
    });
});

// set default name
describe('PUT /api/users/:id', () => {
    it('it should update name, language and bio of user test1', (done) => {
        var req = request(server).put('/api/users/'+common.testUsers.test1.data._id);
        req.cookies = common.testUsers.test1.cookies;
        req.send({name: 'test1'})
        req.expect(200)
        .end(done);
    });
});

// set default username
describe('PUT /api/users/:id', () => {
    it('it should update username', (done) => {
        var req = request(server).put('/api/users/'+common.testUsers.test1.data._id);
        req.cookies = common.testUsers.test1.cookies;
        req.send({username: 'test1'})
        req.expect(200)
        .end(done);
    });
});

// set default email
describe('PUT /api/users/:id', () => {
    it('it should update email', (done) => {
        var req = request(server).put('/api/users/'+common.testUsers.test1.data._id);
        req.cookies = common.testUsers.test1.cookies;
        req.send({email: 'test1@test.com'})
        req.expect(200)
        .end(done);
    });
});