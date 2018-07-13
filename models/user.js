const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    facebookID: String,
    googleID: String,
    city: String,
    country: String,
    email: String,
    avatar: { type: String, default: "images/default-avatar.png" }
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
