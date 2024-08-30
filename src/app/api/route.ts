import clientPromise from "../utils/startMongo";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  const client = await clientPromise;
  const cursor = await client.db("test").collection("greetings").find();
  const greetings = await cursor.toArray();
  return Response.json(greetings);
}

export async function POST(request: Request) {
  const client = await clientPromise;
  const body = await request.json();
  const result = await client
    .db("test")
    .collection("greetings")
    .insertOne({ greeting: body.greeting });
  return Response.json({
    message: "Successfully added the document",
    id: result.insertedId,
  });
}

export async function PUT(request: Request) {
  const client = await clientPromise;
  const body = await request.json();
  const id = new ObjectId(body.id);
  const result = await client
    .db("test")
    .collection("greetings")
    .updateOne({ _id: id }, { $set: { greeting: body.greeting } });
  return Response.json({
    message: "Successfully updated the document",
    modifiedCount: result.modifiedCount,
  });
}

export async function DELETE(request: Request) {
  const client = await clientPromise;
  const body = await request.json();
  const id = new ObjectId(body.id);
  const result = await client
    .db("test")
    .collection("greetings")
    .deleteOne({ _id: id });
  return Response.json({
    message: "Successfully deleted the document",
    deletedCount: result.deletedCount,
  });
}
