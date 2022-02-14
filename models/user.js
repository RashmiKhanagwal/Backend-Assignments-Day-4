const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'] },
    phone:{ type: Number, required: [true, "User phone number required"], match: [/\d{3}-\d{3}-\d{4}/, 'is not a valid phone number!'] },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    role: {
        type: [{
          type: String,
          enum: ['user', 'admin']
        }],
        default: ['user']
    },
    todoList: { type: Array, ref: Todo}
  },
  { timestamps: true }
);

UserSchema.pre(
  'save',
  async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password,10);

    this.password = hash;
    next();
  }
);

module.exports = mongoose.model("Users", UserSchema);