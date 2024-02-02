import EditGreeting from "../components/editGreeting";
//since we are using TypeScript we need to declare our type first
type Greeting = {
  greeting: string;
  _id: string;
};
export default async function Back() {
  const baseUrl = "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api`);
  const greetings: Greeting[] = await response.json();
  return (
    <div>
      {greetings.map((greetingObj) => (
        <EditGreeting
          greetingObj={greetingObj}
          key={greetingObj._id.toString()}
        />
      ))}
    </div>
  );
}
