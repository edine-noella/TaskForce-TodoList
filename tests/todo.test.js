const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();
const { expect } = chai;

chai.use(chaiHttp);

describe('Todo API', () => {
 

  // Test the GET /todos endpoint
  describe('GET /todos', () => {
    it('should return a list of active todos', (done) => {
      chai.request(app)
        .get('/todos')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          // Assuming you have active todos in your test data
          expect(res.body).to.not.be.empty;
          done();
        });
    });
  });

  // Test the GET /todos/:id endpoint
  describe('GET /todos/:id', () => {
    it('should return a single todo by id', (done) => {
      const todoId = 1;
      chai.request(app)
        .get(`/todos/${todoId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('id').eql(todoId);
          done();
        });
    });

    it('should return a 404 status for non-existent todo', (done) => {
      const todoId = 800;
      chai.request(app)
        .get(`/todos/${todoId}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  // Test the POST /todos endpoint
  describe('POST /todos', () => {
    it('should create a new todo', (done) => {
      const todo = {
        title: 'Learn TDD',
        dueDate: '2023-08-31',
      };
      chai.request(app)
        .post('/todos')
        .send(todo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.include.keys('id', 'title', 'completed', 'dueDate', 'deleted');
          res.body.should.have.property('title').eql(todo.title);
          done();
        });
    });
  });

  // Test the PUT /todos/:id endpoint
  describe('PUT /todos/:id', () => {
    it('should update an existing todo', (done) => {
      const todoId = 1;
      const updatedTodo = {
        title: 'Learn TDD in NodeJS',
      };
      chai.request(app)
        .put(`/todos/${todoId}`)
        .send(updatedTodo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.include.keys('id', 'title', 'completed', 'dueDate', 'deleted');
          res.body.should.have.property('title').eql(updatedTodo.title);
          done();
        });
    });
  });

  // Test the DELETE /todos/:id endpoint
  describe('DELETE /todos/:id', () => {
    it('should mark an existing todo as deleted', (done) => {
      const todoId = 1;
      chai.request(app)
        .delete(`/todos/${todoId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Todo was deleted');
          done();
        });
    });
  });

 
  describe('PUT /todos/complete/:id', () => {
    it('should mark an existing todo as completed', (done) => {
      const todoId = 2;
      chai.request(app)
        .put(`/todos/complete/${todoId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('completed').eql(true);
          done();
        });
    });
  });


});
