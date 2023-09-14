const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

var todos = [{id:1, title:'buy the milk'}, {id:2, title:'rent a car'}, {id:3, title:'feed the cat'}
, {id:4, title:'Revise my notes'} , {id:5, title:'visit the museum'}, {id:6, title:'go to the gym'}
, {id:7, title:'go on a date'}, {id:8, title:'rent a car'}, {id:9, title:'go to church'}
];

app.get("/todos", (req, res) => {
    res.send(todos)
})

app.get("/todos/:id", (req, res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id == id);
    if (todo) {
        res.send(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }

})

app.post("/todos", (req, res) => {
    const id = todos[todos.length - 1].id + 1;
    const title = req.body.title;
    const todo = {id, title};
    todos.push(todo);
    res.send(todo)
})

app.put("/todos/:id", (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
   
    const index = todos.findIndex(todo => todo.id == id);

    if (index !== -1) {      
        todos[index].title = title;
        res.send(todos[index]);
    } else {      
        res.status(404).json({ message: 'Todo not found' });
    }
})

app.delete("/todos/:id", (req, res) => {
    const id = req.params.id;
  
    const index = todos.findIndex(todo => todo.id == id);

    if (index !== -1) {   
        todos.splice(index, 1);
        res.send({message: "Todo was deleted"});
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;