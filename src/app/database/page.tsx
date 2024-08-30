import clientPromise from "../utils/startMongo";
import { cache } from "react";

export const revalidate = 0;

const getGreetings = cache(async () => {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const cursor = await db.collection("greetings").find();
    return await cursor.toArray();
  } catch (error) {
    console.error("Failed to fetch greetings:", error);
    return [];
  }
});

export default async function Database() {
  const greetings = await getGreetings();
  return (
    <>
      <h3>posts</h3>
      {greetings.map((greetingObj) => (
        <h1 key={greetingObj._id.toString()}>{greetingObj.greeting}</h1>
      ))}
    </>
  );
}
