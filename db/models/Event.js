import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
  userEmail: { type: String, required: true },
  eventName: { type: String, required: true },
  eventID: { type: Number, required: true },
  eventDate: { type: String, required: true },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
