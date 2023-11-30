import dbConnect from "../../../../../db/connect";
import Venue from "../../../../../db/models/Venue";

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

    response.status(200).json(venue);
  }
}
