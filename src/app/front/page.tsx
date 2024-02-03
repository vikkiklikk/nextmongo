"use client";
import { useState } from "react";
import Link from "next/link";

export default function Front() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const savePost = () => {
    fetch("/api", {
      method: "POST",
      //The client can only send strings to the server
      //so we need to change our whole object to a string
      body: JSON.stringify({ title, description }),
    });
  };

  const previewPost = () => {
    // preview post logic here
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <input
        placeholder="Enter Title Here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Enter Post Description Here"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
        <button onClick={previewPost}>Preview Post</button>
        <Link href="/database">
          <button onClick={savePost} style={{ marginLeft: "10px" }}>
            Send my post to the server
          </button>
        </Link>
      </div>
    </div>
  );
}
