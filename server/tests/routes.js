const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../index').app;
const agent = supertest.agent(app);
const mongoose = require('mongoose');
const Sheet = mongoose.model('Sheet');
const User = mongoose.model('User');
const Workspace = mongoose.model('Workspace');

describe('requests', () => {
  afterEach((done) => {
    Promise.all([Sheet.remove({}), User.remove({}), Workspace.remove({})])
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  beforeEach(done => {
    Workspace.create({
      name: 'test_space'
    })
    .then(() => done(), done);
  });

  describe('GET /workspace', () => {
    it('responds with an array via JSON', (done) => {
      agent
          .get('/workspace')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect((res) => {
              // res.body is the JSON return object
            expect(res.body).to.be.an.instanceOf(Array);
            expect(res.body).to.have.length(0);
          })
          .end(done);
    });
  });
});
