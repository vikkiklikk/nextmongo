import EditGreeting from "../components/editGreeting";

type Greeting = {
  greeting: string;
  _id: string;
};

export default async function Back() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  // Adding a cache-busting query parameter
  const response = await fetch(`${baseUrl}/api?timestamp=${Date.now()}`, {
    cache: "no-store",
  });
  const greetings: Greeting[] = await response.json();

  return (
    <>
      <div>
        {greetings.map((greetingObj) => (
          <EditGreeting greetingObj={greetingObj} key={greetingObj._id} />
        ))}
      </div>
    </>
  );
}
