const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const listSchema = new Schema(
  {
    name: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    location: String,
    lat: Number,
    lng: Number,
    // coordinates: { type: { type: String }, coordinates: [Number] },
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
            "food + drink",
            "lodging",
            "nightlife",
            "music",
            "culture + arts",
            "outdoors",
            "sports",
            "kids",
            "festivals + fairs",
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
        notes: { type: String, maxlength: 200 },
        link: String
      }
    ]
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    usePushEach: true
  }
);

const List = mongoose.model("List", listSchema);

module.exports = List;
