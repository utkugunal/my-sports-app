import mongoose, { Schema } from "mongoose";

const venueSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  district: { type: String, required: true },
  imageURL: { type: String, required: true },
  mapURL: { type: String, required: true },
});

const Venue = mongoose.models.Venue || mongoose.model("Venue", venueSchema);

export default Venue;
