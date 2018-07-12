const Item = new Schema(
  {
    name: { type: String, required: true },
    location: { type: { type: String }, coordinates: [Number] },
    itemType: {
      type: String,
      enum: [
        "food & drink",
        "lodging",
        "nightlife",
        "music",
        "culture & arts",
        "outdoors",
        "kids",
        "festivals & fairs",
        "fun",
        "off-beat",
        "misc"
      ]
    },
    visitDate: Date,

    img: {
      name: String,
      path: String
    },
    priority: Number,
    notes: { type: String, maxlength: 200 }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);
