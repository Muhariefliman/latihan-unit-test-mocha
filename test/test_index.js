let chai = require('chai');
let chaiHTTP = require('chai-http');
// const should = chai.should();
const app = require('../index');

// Assertion style
chai.use(chaiHTTP);
chai.should();

describe('task API', () => {
    /** 
     * TEST: GET /task
     */

    describe('GET /task/all', () => {
        it("should return all task", (done) => {
            chai.request(app)
                .get('/task/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should not return all task", (done) => {
            chai.request(app)
                .get('/task/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    /**
     * TEST: GET /task/:id
     */

    describe('GET /task/:id', () => {
        it("should return task by id", (done) => {
            chai.request(app)
                .get('/task/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.code.should.equal(200);
                    res.body.status.should.equal('OK');
                    res.body.data.should.be.a('object');
                    done();
                });
        });

        it("should not return task by id", (done) => {
            chai.request(app)
                .get('/task/6')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.code.should.equal(404);
                    res.body.status.should.equal('Not Found');
                    done();
                });
        });
    });

    /**
     * TEST: POST /task/add
     */

    describe('POST /task/add', () => {
        it("should add task", (done) => {
            chai.request(app)
                .post('/task/add')
                .send({
                    name: 'Learn MochaJs',
                    status: 'In Progress'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.code.should.equal(200);
                    res.body.status.should.equal('OK');
                    res.body.data.should.be.a('object');
                    done();
                });
        });
    });

    /**
     * TEST: POST /task/update
     */
    describe('POST /task/update', () => {
        it("should update task", (done) => {
            chai.request(app)
                .post('/task/update')
                .send({
                    id: 1,
                    name: 'Learn MochaJs',
                    status: 'In Progress'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.code.should.equal(200);
                    res.body.status.should.equal('OK');
                    res.body.data.should.be.a('object');
                    done();
                });
        });
        it("should not update task", (done) => {
            chai.request(app)
                .post('/task/update')
                .send({
                    id: 6,
                    name: 'Learn MochaJs',
                    status: 'In Progress'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.code.should.equal(404);
                    res.body.status.should.equal('Not Found');
                    done();
                });
        });
    });

    /**
     *  TEST: POST /task/delete
     */

    describe('POST /task/delete', () => {
        it("should delete task", (done) => {
            chai.request(app)
                .post('/task/delete')
                .send({
                    id: 1
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.code.should.equal(200);
                    res.body.status.should.equal('OK');
                    res.body.data.should.be.a('object');
                    done();
                });
        });

        it("should not delete task", (done) => {
            chai.request(app)
                .post('/task/delete')
                .send({
                    id: 6
                })
                .end((err, res) => {        
                    res.should.have.status(200);
                    res.body.code.should.equal(404);
                    res.body.status.should.equal('Not Found');
                    done();
                });
        });
    });
});