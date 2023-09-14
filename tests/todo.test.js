const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Replace with the path to your Express app
const should = chai.should();

chai.use(chaiHttp);

describe('Todo API', () => {
 

  describe('GET /todos', () => {
    it('it should return a list of todos', (done) => {
      chai.request(app)
        .get('/todos')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

 
  describe('GET /todos/:id', () => {
    it('it should return a single todo by id', (done) => {
      const todoId = 1; 
      chai.request(app)
        .get(`/todos/${todoId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(todoId);
          done();
        });
    });

    it('it should return a 404 status for non-existent todo', (done) => {
      const todoId = 800; 
      chai.request(app)
        .get(`/todos/${todoId}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  
});
