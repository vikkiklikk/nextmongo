import { MongoClient, ServerApiVersion } from "mongodb";
import { revalidatePath } from "next/cache";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("enviroment variable MONGODB_URI is not defined");
}
// Create a MongoClient with a MongoClientOptions object to set the stable API vesion

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Querying our database
    const cursor = await client.db("test").collection("blogposts").find();
    const array = await cursor.toArray();
    return array;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function renderPosts() {
  const posts = await run();

  return (
    <>
      <p>Here are the posts</p>
      {posts.map((postObj) => (
        <div
          key={postObj.id}
          style={{
            marginBottom: "20px",
            padding: "10px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <h1>{postObj.title}</h1>
          <h3>{postObj.description}</h3>
        </div>
      ))}
    </>
  );
}

export default async function Database() {
  return renderPosts();
}

revalidatePath("/src/app/database/page.tsx");
