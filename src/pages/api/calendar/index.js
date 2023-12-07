import dbConnect from "../../../../db/connect";
import Event from "../../../../db/models/Event";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const events = await Event.find();
    if (!events) {
      return response.status(405).json({ message: "GET method not allowed" });
    }
    return response.status(200).json(events);
  }

  if (request.method === "POST") {
    try {
      const event = request.body;
      await Event.create(event);

      console.log("event: ", event);
      return response.status(201).json(event);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    await Event.findByIdAndDelete(id);
    // Declare jokeToDelete to be the joke identified by its id and delete it.
    // This line handles the entire deletion process.
    response.status(200).json({ status: `Event ${id} successfully deleted.` });
  }
}
