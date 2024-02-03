import connect from "../utils/startMongo";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  const client = await connect;
  const cursor = await client.db("test").collection("blogposts").find();
  const posts = await cursor.toArray();
  return Response.json(posts);
}

export async function POST(request: Request) {
  const client = await connect;
  const body = await request.json();
  await client
    .db("test")
    .collection("blogposts")
    .insertOne({ title: body.title, description: body.description });
  return Response.json({ message: "successfully updated the document" });
}

export async function PUT(request: Request) {
  const client = await connect;
  const body = await request.json();
  const id = new ObjectId(body.id);
  await client
    .db("test")
    .collection("blogposts")
    .updateOne(
      { _id: id },
      { $set: { title: body.title, description: body.description } }
    );
  return Response.json({ message: "successfully updated the document" });
}

export async function DELETE(request: Request) {
  const client = await connect;
  const body = await request.json();
  const id = new ObjectId(body.id);
  await client.db("test").collection("blogposts").deleteOne({ _id: id });
  return Response.json({ message: "successfully deleted the document" });
}
