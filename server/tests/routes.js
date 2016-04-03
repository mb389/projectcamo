const chai = require('chai');
const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../index').app;
const agent = supertest.agent(app);
const mongoose = require('mongoose');
const Sheet = mongoose.model('Sheet');
const User = mongoose.model('User');
const Workspace = mongoose.model('Workspace');

describe('requests',function()  {

  afterEach(function(done) {
    Promise.all([Sheet.remove({}),User.remove({}),Workspace.remove({})])
    .then(function() {
      done()
    })
    .catch(function(err) {
      done(err)
    })
  })

  beforeEach(done => {
    Workspace.create({
      name: "test_space"
    })
    .then(function() {
      return done();
    } ,done)
  })

  describe('GET /workspace', function() {
    it('responds with an array via JSON', function (done) {
      agent
          .get('/workspace')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(function (res) {
              // res.body is the JSON return object
              expect(res.body).to.be.an.instanceOf(Array);
              expect(res.body).to.have.length(0);
          })
          .end(done);

});

});

});
