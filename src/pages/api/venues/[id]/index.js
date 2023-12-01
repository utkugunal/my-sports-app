import dbConnect from "../../../../../db/connect";
import Venue from "../../../../../db/models/Venue";
import Comment from "../../../../../db/models/Comment";

export default async function handler(request, response) {
  const { id } = request.query;

  if (!id) {
    return;
  }

  await dbConnect();

  if (request.method === "GET") {
    const venue = await Venue.findById(id);
    if (!venue) {
      return response.status(404).json({ status: "Not found" });
    }
    const comments = await Comment.find({ venueID: id });
    response.status(200).json({ venue, comments });
  }

  if (request.method === "POST") {
    try {
      const comment = request.body;
      await Comment.create(comment);
      console.log(comment);
      return response.status(201).json(comment);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
