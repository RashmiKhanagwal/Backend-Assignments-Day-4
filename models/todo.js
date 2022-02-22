const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    is_Complete:{ type: Boolean, required: true, default:false },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    category: { type: Array },
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);