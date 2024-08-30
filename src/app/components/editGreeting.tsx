"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  greetingObj: {
    _id: string;
    greeting: string;
  };
};

const EditGreeting = ({ greetingObj }: Props) => {
  const [greeting, setGreeting] = useState("");
  const router = useRouter();

  const changeGreeting = async () => {
    const response = await fetch("/api", {
      method: "PUT",
      body: JSON.stringify({ greeting, id: greetingObj._id }),
    });
    if (response.ok) {
      router.refresh();
    }
  };

  const deleteGreeting = async () => {
    const response = await fetch("/api", {
      method: "DELETE",
      body: JSON.stringify({ id: greetingObj._id }),
    });
    if (response.ok) {
      router.refresh();
    }
  };

  return (
    <>
      <div key={greetingObj._id}>
        <h1>{greetingObj.greeting}</h1>
        <input
          value={greeting}
          onChange={(e) => setGreeting(e.target.value)}
        ></input>
        <button onClick={changeGreeting}>change this greeting</button>
        <button onClick={deleteGreeting}>delete this greeting</button>
      </div>
    </>
  );
};

export default EditGreeting;
