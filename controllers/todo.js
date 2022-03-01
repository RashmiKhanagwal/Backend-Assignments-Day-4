const Todo = require("../models/todo");

// Day 1 Todo List 

//CREATE TODO
module.exports.createTodo = async (req, res) => {
    const newTodo = new Todo(req.body);
    try {
      const savedTodo = await newTodo.save();
      res.status(200).json(savedTodo);
    } catch (err) {
      res.status(500).json(err);
    }
};

// GET all todos for that User --- Day3
module.exports.getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find(req.params.id);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
};

//controller for admin to show all todos
module.exports.getAdminTodo = async (req, res) =>{
  await Todo.find().populate('userId', 'userName')
  .then((todos) =>{
      res.status(200).json(todos)
  })
  .catch((error)=>{
      res.status(500).json({message:error.message})
  })
  
};


//GET one TODO 
module.exports.getOneTodo = async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      res.status(200).json(todo);
    } catch (err) {
      res.status(500).json(err);
    }
};
  
//UPDATE todo
module.exports.updateTodo = async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (todo.username === req.body.username) {
        try {
          const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedTodo);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your todo!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
};
  
//DELETE todo
module.exports.deleteTodo = async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (todo.username === req.body.username) {
        try {
          await todo.delete();
          res.status(200).json("todo has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your todo!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
};

// Day 2 TODO List with filtering

// fetch by Category

module.exports.fetchByCategory = async (req,res) => {
    try {
      const category = await Todo.find(req.params.category);
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json(err);
    }
};
  
// search by title
  
module.exports.searchByTitle = async (req,res) => {
    try {
      const title = await Todo.find(req.params.title);
      res.status(200).json(title);
    } catch (err) {
      res.status(500).json(err);
    }
};
  
// Add capability to sort the data by created_at
  
module.exports.Sort = async (req,res) => {
    try{
        const todo = await Todo.find().sort({createdAt: 1});
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json(err);
    }
      
};
  
// Add api to mark Todo as done, can you use an exisiting api to achieve this?
  
module.exports.todoDone = async (req,res)=>{
    const id = req.params.id;
    try{
        const todo = await Todo.updateOne({_id : {$req:id}},{is_Complete : "Done"});
        res.status(200).json({message : "is_Complete updated to Done"})
    } catch (err){
        res.status(500).json(err);
    }
};

// Day 3  User with Admin role should be able to get all Todos

module.exports.todoDonebyAdmin = async (req, res) =>{
  const id = req.params.id
  await Todo.updateOne({_id : {$eq:id}},{status : "Done"})
  .then((todo)=>{
      res.status(200).json({message : "Status updated to Done"})
  })
  .catch(err =>{
      res.status(500).json({message : err.message})
  })
};