import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  username: { type: String, required: true },
  comment: { type: String, required: true },
  venue: { type: Schema.Types.ObjectId, ref: "Venue" },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
