const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5000;
const TODO_FILE = 'todos.json';

app.use(cors());
app.use(bodyParser.json());

// Load Todos from the file
const loadTodos = () => {
  if (fs.existsSync(TODO_FILE)) {
    const todosData = fs.readFileSync(TODO_FILE);
    return JSON.parse(todosData);
  }
  return [];
};

// Save Todos to the file
const saveTodos = (todos) => {
  fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
};

// GET: Fetch all todos
app.get('/todos', (req, res) => {
  const todos = loadTodos();
  res.json(todos);
});

// POST: Add a new todo
app.post('/todos', (req, res) => {
  const todos = loadTodos();
  const newTodo = { id: Date.now(), text: req.body.text, completed: false };
  todos.push(newTodo);
  saveTodos(todos);
  res.json(newTodo);
});

// PUT: Update a todo
app.put('/todos/:id', (req, res) => {
  const todos = loadTodos();
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(req.params.id));
  if (todoIndex > -1) {
    todos[todoIndex].completed = req.body.completed;
    saveTodos(todos);
    res.json(todos[todoIndex]);
  } else {
    res.status(404).send('Todo not found');
  }
});

// DELETE: Delete a todo
app.delete('/todos/:id', (req, res) => {
  let todos = loadTodos();
  todos = todos.filter((todo) => todo.id !== parseInt(req.params.id));
  saveTodos(todos);
  res.json({ message: 'Todo deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
