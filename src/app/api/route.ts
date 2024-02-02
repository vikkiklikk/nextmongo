import connect from "../utils/startMongo";

export async function GET(request: Request) {
  const client = await connect;
  const cursor = await client.db("test").collection("greetings").find();
  const greetings = await cursor.toArray();
  return Response.json(greetings);
}

export async function POST(request: Request) {
  const client = await connect;
  const cursor = await client
    .db("test")
    .collection("greetings")
    .insertOne({ greeting: "Goodbye cruel world" });
  return Response.json({ message: "successfully updated the document" });
}
