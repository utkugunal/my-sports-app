import dbConnect from "../../../../db/connect";
import Event from "../../../../db/models/Event";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "DELETE") {
    const { id } = request.query;

    if (!id) {
      return response.status(400).json({ status: "Missing 'id' parameter." });
    }

    try {
      await Event.findByIdAndDelete(id);
      return response
        .status(200)
        .json({ status: `Event ${id} successfully deleted.` });
    } catch (error) {
      return response
        .status(500)
        .json({ status: "Internal Server Error", error: error.message });
    }
  }
}
