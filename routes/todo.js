const router = require("express").Router();
const Todo = require("../controllers/todo");
const User = require("../middleware/user");
const Admin = require("../middleware/admin");

// Day 1 Todo List
router.post("/", User, Todo.createTodo);
// Create api to get TODO list for User --  Day3
router.get("/:id", User, Todo.getAllTodo);
// User with Admin role should be able to get all Todos -- Day3
router.get("/:id", Admin, Todo.getAdminTodo);
router.get("/:id", User, Todo.getOneTodo);
router.put("/:id", User, Todo.updateTodo);
router.delete("/:id", User, Todo.deleteTodo);


// Day 2 TODO List with filtering

router.get("/category/:category", Admin, Todo.fetchByCategory);
router.get("/title/:title", Admin, Todo.searchByTitle);
router.get("/sort", Admin, Todo.Sort);
router.patch("/updated/:id", User, Todo.todoDone);
router.patch("/updated/:id", Admin, Todo.todoDonebyAdmin);

module.exports = router;