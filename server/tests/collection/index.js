var common  = require('../common');
let server  = common.server;
let models  = common.models;
let chai    = common.chai;
let request = common.request;
let should  = common.should;

describe('GET /api/collections', () => {
    it('it should GET 0 collections', (done) => {
        request(server)
            .get('/api/collections')
            .expect(200, {
                data: []
            }, done)
    });
});

describe('GET /api/collections/test', () => {
    it('it should make 404 error', (done) => {
        request(server)
            .get('/api/collections/test')
            .expect(404, done)
    });
});

describe('POST /api/collections', () => {
    it('it should make 401 error', (done) => {
        request(server)
            .post('/api/collections')
            .expect(401, done) 
    });
});

describe('PUT /api/collections/test', () => {
    it('it should make 401 error', (done) => {
        request(server)
            .put('/api/collections/test')
            .expect(401, done)
    });
});

describe('DELETE /api/collections/test', () => {
    it('it should make 401 error', (done) => {
        request(server)
            .delete('/api/collections/test')
            .expect(401, done)
    });
});