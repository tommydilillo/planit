const Item = new Schema(
  {
    name: String,
    location: { type: { type: String }, coordinates: [Number] },
    itemType: String,
    visited: Boolean,
    datesVisited: String,
    imgName: String,
    imgPath: String,
    order: Number
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);
