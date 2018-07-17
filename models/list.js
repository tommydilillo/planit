const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const listSchema = new Schema(
  {
    name: String,
    list_creator: [{ type: ObjectId, ref: "User" }],
    location: String,
    coordinates: [String],
    purpose: {
      type: String,
      enum: ["vacation", "staycation", "roadtrip", "local", "other"]
    },
    public: {
      type: Boolean,
      default: "true"
    },
    items: [
      {
        name: String,
        location: String,
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
        visitDate: Date,
        imgs: [
          {
            name: String,
            path: String
          }
        ],
        priority: Number,
        notes: { type: String, maxlength: 200 }
      }
    ]
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);

const List = mongoose.model("List", listSchema);

module.exports = List;
