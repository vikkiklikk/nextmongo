"use client";
import { useState } from "react";

type Props = {
  greetingObj: {
    _id: string;
    greeting: string;
  };
};
const EditGreeting = ({ greetingObj }: Props) => {
  const [greeting, setGreeting] = useState("");
  const changeGreeting = () => {
    fetch("/api", {
      method: "PUT",
      body: JSON.stringify({ greeting, id: greetingObj._id }),
    });
  };

  const deleteGreeting = () => {
    fetch("/api", {
      method: "DELETE",
      body: JSON.stringify({ greeting, id: greetingObj._id }),
    });
  };

  return (
    <div key={greetingObj._id.toString()}>
      <h1> {greetingObj.greeting} </h1>
      <input
        value={greeting}
        onChange={(e) => setGreeting(e.target.value)}
      ></input>
      <button onClick={changeGreeting}>change this greeting</button>
      <button onClick={deleteGreeting}>delete this greeting</button>
    </div>
  );
};
export default EditGreeting;
