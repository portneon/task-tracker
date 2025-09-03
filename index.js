const express = require("express")
const fs = require("fs");
const path = require("path")
const cors = require('cors')
const mysql = require('mysql2/promise');


const app = express()
app.use(cors())
app.use(express.json())

const path_to_json = path.join(__dirname, "./data.json");
async function connectiontodb() {
    const config = {
        host: 'localhost',
        user : 'root',
    
        database : 'todos'
        
    }
    const connection = await mysql.createconnection(config)
    await connection.connect()
    

}


function readTodos() {
  const data = fs.readFileSync(path_to_json, "utf-8");
  return JSON.parse(data);
}

function writeTodos(todos) {
  fs.writeFileSync(path_to_json, JSON.stringify(todos, null, 2));
}



app.get("/api/v1/todos", (req, res) => {
  const todos = readTodos();
  res.json(todos);
});


app.post("/api/v1/todos", (req, res) => {
  const todos = readTodos();
  const newTodo = {
    id: Date.now(),
    task: req.body.task,
    completed: false,
  };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json({ message: "Todo added!", todo: newTodo });
});




app.patch("/api/v1/todos/:id", (req, res) => {
  let todos = readTodos();
  const id = Number(req.params.id);

  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Todo not found" });

  todos[index] = { ...todos[index], ...req.body };
  writeTodos(todos);
  res.json({ message: "Todo updated!", todo: todos[index] });
});


app.delete("/api/v1/todos/:id", (req, res) => {
  let todos = readTodos();
  const id = Number(req.params.id);

  const newTodos = todos.filter((t) => t.id !== id);
  if (newTodos.length === todos.length)
    return res.status(404).json({ error: "Todo not found" })

  writeTodos(newTodos);
  res.json({ message: "Todo deleted!" })
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

