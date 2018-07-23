const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: String,
    facebookID: String,
    googleID: String,
    city: String,
    state: String,
    country: String,
    email: String,
    age: { type: Number, min: 0, max: 150 },
    avatar: { type: String, default: "images/default-avatar.jpg" }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
