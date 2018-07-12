const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    facebookID: String,
    googleID: String,
    avatar: { type: String, default: "images/default-avatar.png" },
    homeCity: String,
    email: String 
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
