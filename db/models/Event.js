import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
  userEmail: { type: String, required: true },
  title: { type: String, required: true },
  id: { type: Number, required: true },
  start: { type: String, required: true },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
