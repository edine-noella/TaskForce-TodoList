const { validationResult } = require('express-validator');
const { body, param } = require('express-validator');

var todos = [
    {id:1, title:'buy the milk', completed: false , dueDate: '2020-11-03', deleted:false},
    {id:2, title:'rent a car', completed: false , dueDate: '2020-11-03', deleted:false},
    {id:3, title:'feed the cat',completed: false , dueDate: '2020-11-03', deleted:false},
    {id:4, title:'Revise my notes',completed: false , dueDate: '2020-11-03', deleted:false}, 
    {id:5, title:'visit the museum',completed: false , dueDate: '2020-11-03', deleted:false},
    {id:6, title:'go to the gym',completed: false , dueDate: '2020-11-03', deleted:false},
    {id:7, title:'go on a date',completed: false , dueDate: '2020-11-03', deleted:false},
    {id:8, title:'rent a car',completed: false , dueDate: '2020-11-03', deleted:false}, 
    {id:9, title:'go to church',completed: false , dueDate: '2020-11-03', deleted:false},
];

 
exports.getAllTodos = (req, res) => {
    const activeTodos = todos.filter((todo) => !todo.deleted);
    res.send(activeTodos);
  };
  
  exports.getTodoById = (req, res) => {
    const id = req.params.id;
    const todo = todos.find((todo) => todo.id == id && !todo.deleted);
    if (todo) {
      res.send(todo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  };
  
  exports.createTodo = [
    // Add validation checks using express-validator
    body('title').notEmpty().withMessage('Title is required'),
    body('dueDate').isDate({ format: 'YYYY-MM-DD' }).withMessage('Due date must be in YYYY-MM-DD format').notEmpty().withMessage('Due date is required'),    
  
    (req, res) => {
      
      const errors = validationResult(req);  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const id = todos[todos.length - 1].id + 1;
      const title = req.body.title;
      const dueDate = req.body.dueDate;
      const deleted = false;
      const completed = false;
      const todo = { id, title, completed, dueDate, deleted };
      todos.push(todo);
      res.send(todo);
    }
  ];
  
  exports.updateTodo = [
    // Add validation checks using express-validator
    param('id').isNumeric().withMessage('ID must be a number'),
    body('title').optional().notEmpty().withMessage('Title is required'),
    body('dueDate').optional().isDate({ format: 'YYYY-MM-DD' }).withMessage('Due date must be in YYYY-MM-DD format'),
  
    (req, res) => {
      // Check for validation errors
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const id = req.params.id;
      const title = req.body.title;
      const dueDate = req.body.dueDate;
      const index = todos.findIndex((todo) => todo.id == id);
  
      if (index !== -1) {
        if (title !== undefined) {
          todos[index].title = title;
        }
        if (dueDate !== undefined) {
          todos[index].dueDate = dueDate;
        }
        res.send(todos[index]);
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    }
  ];
  
  exports.deleteTodo = (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex((todo) => todo.id == id);
  
    if (index !== -1) {             
      todos[index].deleted = true;
      res.send({ message: 'Todo was deleted' });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  };
  
  exports.completeTodo = (req, res) => {
    const id = req.params.id;
    const todo = todos.find((todo) => todo.id == id);
  
    if (todo) {
      todo.completed = true;
      res.send(todo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  };
  