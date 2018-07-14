const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: { type: String }, coordinates: [Number] },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postal_code: String
    }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
