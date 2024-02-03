"use client";
import { useState } from "react";

type Props = {
  postObj: {
    _id: string;
    title: string;
    description: string;
  };
};
const EditGreeting = ({ postObj }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const changePost = () => {
    fetch("/api", {
      method: "PUT",
      body: JSON.stringify({ title, description, id: postObj._id }),
    });
  };

  const deletePost = () => {
    fetch("/api", {
      method: "DELETE",
      body: JSON.stringify({ postObj, id: postObj._id }),
    });
  };

  return (
    <div key={postObj._id.toString()}>
      <h1> {postObj.title} </h1>
      <h3> {postObj.description} </h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={changePost}>change this greeting</button>
      <button onClick={deletePost}>delete this greeting</button>
    </div>
  );
};
export default EditGreeting;
