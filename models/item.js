const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const itemSchema = new Schema(
  {
    name: [{ type: ObjectId, ref: "Place" }],
    location: [{ type: ObjectId, ref: "Place" }],
    category: {
      type: String,
      enum: [
        "food & drink",
        "lodging",
        "nightlife",
        "music",
        "culture & arts",
        "outdoors",
        "sports",
        "kids",
        "festivals & fairs",
        "fun",
        "off-beat",
        "misc"
      ]
    },
    visitDate: [Date],

    imgs: [
      {
        name: String,
        path: String
      }
    ],
    priority: Number,
    notes: { type: String, maxlength: 200 }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
