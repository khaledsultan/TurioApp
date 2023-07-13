import dbConnect from "../../../../db/connect";
import Location from "../../../../db/models/Location";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }
  if (request.method === "GET") {
    const location = await Location.findById(id);
    response.status(200).json(location);
    console.log({ location });
  }

  if (!location) {
    return response.status(404).json({ status: "Not found" });
  }
}
