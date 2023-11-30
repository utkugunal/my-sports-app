import Venue from "../../../../db/models/Venue";
import dbConnect from "../../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const venues = await Venue.find();
    if (!venues) {
      return response.status(405).json({ message: "GET method not allowed" });
    }
    return response.status(200).json(venues);
  }
}
