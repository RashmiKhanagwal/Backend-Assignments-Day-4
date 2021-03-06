const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const users = require("./routes/user");
const todo = require("./routes/todo");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose
  .connect('mongodb://localhost/TodoList', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// passport middleware
app.use(passport.initialize());

// passport config
require("./middleware/passport")(passport);

// routes
app.use("/todo", todo);
app.use("/users", users);

app.listen(3000, () => {console.log("server connected")});