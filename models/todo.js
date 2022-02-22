const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    is_Complete:{ type: Boolean, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    category: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);