const List = new Schema(
  {
    name: String,
    user_id: String,
    location: { type: { type: String }, coordinates: [Number] },
    purpose: {
      type: String,
      enum: ["vacation", "staycation", "roadtrip", "local"]
    },
    public: {
      type: boolean,
      default: "true"
    }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);
