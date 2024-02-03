"use client";
import { useState, useEffect } from "react";

type Props = {
  postObj: {
    _id: string;
    title: string;
    description: string;
  };
};

const EditGreeting = ({ postObj }: Props) => {
  const [title, setTitle] = useState(postObj.title || "");
  const [description, setDescription] = useState(postObj.description || "");
  const [changeMessage, setChangeMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setTitle(postObj.title || "");
    setDescription(postObj.description || "");
    setChangeMessage(null);
    setErrorMessage(null);
  }, [postObj]);

  const changePost = async () => {
    if (!title || !description) {
      setErrorMessage("Title and description must be filled");
      setChangeMessage(null);
      return;
    }

    try {
      const response = await fetch("/api", {
        method: "PUT",
        body: JSON.stringify({ title, description, id: postObj._id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      setChangeMessage("Post edited");
      setErrorMessage(null);
    } catch (error) {
      console.error("Error updating post:", error);
      setErrorMessage("Failed to update post");
      setChangeMessage(null);
    }
  };

  const deletePost = () => {
    fetch("/api", {
      method: "DELETE",
      body: JSON.stringify({ postObj, id: postObj._id }),
    });
    console.log("post deleted");
  };

  return (
    <div key={postObj._id.toString()}>
      <h1> {postObj.title} </h1>
      <h3> {postObj.description} </h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ border: title ? "1px solid #ccc" : "1px solid red" }} // Apply conditional inline style
      ></input>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ border: description ? "1px solid #ccc" : "1px solid red" }} // Apply conditional inline style
      />
      <button onClick={changePost}>change this greeting</button>
      <button onClick={deletePost}>delete this greeting</button>
      {changeMessage && <div style={{ color: "green" }}>{changeMessage}</div>}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
};

export default EditGreeting;
