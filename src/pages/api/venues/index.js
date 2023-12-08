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

  if (request.method === "POST") {
    try {
      const newVenue = request.body;
      await Venue.create(newVenue);

      console.log("newVenue: ", newVenue);
      return response.status(201).json(newVenue);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
