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


    describe('POST /todos', () => {
    it('it should create a new todo', (done) => {
      const todo = {
        title: 'Learn TDD',
      };
      chai.request(app)
        .post('/todos')
        .send(todo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.include.keys('id', 'title', 'completed');
          res.body.should.have.property('title').eql(todo.title);
          done();
        });
    });
});

describe('PUT /todos/:id', () => {
    it('it should update an existing todo', (done) => {
      const todoId = 1;
      const todo = {
        title: 'Learn TDD in NodeJS',
      };
      chai.request(app)
        .put(`/todos/${todoId}`)
        .send(todo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.include.keys('id', 'title');
          res.body.should.have.property('title').eql(todo.title);
          done();
        });
    });
  });

    describe('DELETE /todos/:id', () => {
    it('it should delete an existing todo', (done) => {
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

describe('PUT /todos/:id/complete', () => {
    it('it should mark an existing todo as completed', (done) => {
      const todoId = 2;
      chai.request(app)
        .put(`/todos/${todoId}/complete`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('completed').eql(true);
          done();
        });
    });
  });

  
});
