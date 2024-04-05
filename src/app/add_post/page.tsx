"use client";
import React, { useState } from "react";

const AddPostForm: React.FC = () => {
  const [postText, setPostText] = useState<string>("");
  const [postMedia, setPostMedia] = useState<File | null>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(event.target.value);
  };

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setPostMedia(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!postText.trim() || !postMedia) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("postText", postText);
    formData.append("postMedia", postMedia);

    fetch("http://localhost:3001/add_post", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit post.");
        }
        console.log("Post submitted successfully.");
      })
      .catch((error) => {
        console.error("Error submitting post:", error);
        alert("Error submitting post. Please try again later.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Post</h2>
      <label htmlFor="postText">Text:</label>
      <textarea
        name="postText"
        id="postText"
        rows={4}
        value={postText}
        onChange={handleTextChange}
        required
      />

      <label htmlFor="postMedia">Media:</label>
      <input
        type="file"
        name="postMedia"
        id="postMedia"
        accept="image/*, video/*"
        onChange={handleMediaChange}
        required
      />

      <button type="submit">Post</button>
    </form>
  );
};

export default AddPostForm;
