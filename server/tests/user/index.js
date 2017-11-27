var common  = require('../common');
let server  = common.server;
let models  = common.models;
let chai    = common.chai;
let request = common.request;
let should  = common.should;
let assert  = common.assert;

describe('GET /api/users', () => {
    it('it should GET 0 users', (done) => {
        request(server)
            .get('/api/users')
            .expect(200, {
                data: []
            }, done)
    });
});

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

describe('POST /auth/login', () => {
    it('it should make 401 error', (done) => {
        request(server)
            .post('/auth/login')
            .send({username: '', password: ''})
            .expect(400, done)
    });
});

describe('POST /auth/login', () => {
    it('it should make 401 error', (done) => {
        request(server)
            .post('/auth/login')
            .send({username: 'username', password: 'password'})
            .expect(401, done)
    });
});

describe('GET /auth/currentuser', () => {
    it('it should return empty object', (done) => {
        request(server)
            .get('/auth/currentuser')
            .expect(200, {}, done)
    });
});

describe('POST /auth/signup', () => {
    it('it should make 400 error', (done) => {
        request(server)
            .post('/auth/signup')
            .send({username: '', email: '', password: ''})
            .expect(400, done)
    });
});

describe('POST /auth/signup', () => {
    it('it should make 422 error', (done) => {
        request(server)
            .post('/auth/signup')
            .send({username: 'è3#dzqd', email: 'dqzdd.dd', password: 'dqzd44'})
            .expect(422, done)
    });
});

describe('POST /auth/signup', () => {
    it('it should create a user', (done) => {
        request(server)
            .post('/auth/signup')
            .send({username: 'test1', email: 'test1@test.com', password: 'test1'})
            .expect(200)
            .expect(response => {
                assert.equal(response.body.data.name, 'test1');
                assert.equal(response.body.data.username, 'test1');
                assert.equal(response.body.data.email, 'test1@test.com');
                assert.equal(response.body.data.local.password, '');
                common.testUsers.test1.data = response.body.data;
            })
            .end(done);
    });
});

describe('POST /auth/signup', () => {
    it('it should create a user', (done) => {
        request(server)
            .post('/auth/signup')
            .send({username: 'test2', email: 'test2@test.com', password: 'test2'})
            .expect(200)
            .expect(response => {
                assert.equal(response.body.data.name, 'test2');
                assert.equal(response.body.data.username, 'test2');
                assert.equal(response.body.data.email, 'test2@test.com');
                assert.equal(response.body.data.local.password, '');
                common.testUsers.test2.data = response.body.data;
                common.testUsers.test2.cookies = response.headers['set-cookie'].pop().split(';')[0];
            })
            .end(done);
    });
});

describe('POST /auth/signup', () => {
    it('it should make 422 error because username and email already used', (done) => {
        request(server)
            .post('/auth/signup')
            .send({username: 'test2', email: 'test2@test.com', password: 'test2'})
            .expect(422, done);
    });
});

describe('GET /auth/currentuser', () => {
    it('it should return the currentuser', (done) => {
        var req = request(server).get('/auth/currentuser');
        req.cookies = common.testUsers.test2.cookies;
        req.expect(200)
        .expect(response => {
            assert.equal(response.body.data.name, 'test2');
            assert.equal(response.body.data.username, 'test2');
            assert.equal(response.body.data.email, 'test2@test.com');
            assert.isUndefined(response.body.data.local.password);
        })
        .end(done);
    });
});

describe('GET /auth/logout', () => {
    it('it should logout', (done) => {
        var req = request(server).get('/auth/logout');
        req.cookies = common.testUsers.test2.cookies;
        req.expect(200, done);
    });
});

describe('GET /auth/currentuser', () => {
    it('it should return nothing', (done) => {
        var req = request(server).get('/auth/currentuser');
        req.cookies = common.testUsers.test2.cookies;
        req.expect(200)
        .expect(response => {
            assert.notExists(response.body.data);
        })
        .end(done);
    });
});

describe('POST /auth/login', () => {
    it('it should login test1', (done) => {
        request(server)
            .post('/auth/login')
            .send({username: 'test1', password: 'test1'})
            .expect(200)
            .expect(response => {
                assert.equal(response.body.data.username, 'test1');
                assert.equal(response.body.data.email, 'test1@test.com');
                assert.equal(response.body.data.local.password, '');
                common.testUsers.test1.cookies = response.headers['set-cookie'].pop().split(';')[0];
            })
            .end(done);
    });
});

describe('PUT /api/users/:id', () => {
    it('it should update user test1', (done) => {
        var req = request(server).put('/api/users/'+common.testUsers.test1.data._id);
        req.cookies = common.testUsers.test1.cookies;
        req.send({name: 'Test 1', bio: 'I\'m test1'})
        req.expect(200)
        .expect(response => {
            assert.equal(response.body.data.name, 'Test 1');
            assert.equal(response.body.data.bio, 'I\'m test1');
            assert.equal(response.body.data.username, 'test1');
            assert.equal(response.body.data.email, 'test1@test.com');
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
            assert.equal(response.body.data.username, 'test1');
            assert.equal(response.body.data.email, 'test1@test.com');
        })
        .end(done);
    });
});