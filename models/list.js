const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const listSchema = new Schema(
  {
    name: String,
    list_creator: [{ type: ObjectId, ref: "User" }],
    location: { type: { type: String }, coordinates: [Number] },
    purpopose: {
      type: String,
      enum: ["vacation", "staycation", "roadtrip", "local", "other"]
    },
    public: {
      type: Boolean,
      default: "true"
    }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);

const List = mongoose.model("List", listSchema);

module.exports = List;
