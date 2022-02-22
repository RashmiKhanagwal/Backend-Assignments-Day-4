const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose
  .connect('mongodb://localhost/TodoList', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


app.listen(3000, () => {console.log("server connected")});