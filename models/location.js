const List = new Schema(
  {
    name: String,
    location: { type: { type: String }, coordinates: [Number] },
    purpose: String, //
    public: boolean
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);
