import EditGreeting from "../components/editGreeting";
//since we are using TypeScript we need to declare our type first
type Post = {
  title: string;
  description: string;
  _id: string;
};
export default async function Back() {
  const baseUrl = "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api`);
  const posts: Post[] = await response.json();
  return (
    <div>
      {posts.map((postObj) => (
        <EditGreeting postObj={postObj} key={postObj._id.toString()} />
      ))}
    </div>
  );
}
