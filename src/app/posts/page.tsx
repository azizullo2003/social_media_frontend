"use client";

import React, { useState, useEffect } from "react";
import "../globals.css";

import { socket } from "../../socket";

import type { ChangeEvent, SetStateAction } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function getPosts() {
  console.log("fetchPosts");

  try {
    const res = await fetch("http://localhost:3001/posts");
    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

interface Post {
  _id: string;
  text: string;
  imageUrl?: string; // Optional image URL
  videoUrl?: string; // Optional video URL
  views: number;
  liked: boolean;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("post_liked", (msg: SetStateAction<string>) => {
      console.log(msg);
      toast.success("Your post is liked!");
      setInput(msg);
    });
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    if (socket !== undefined) {
      socket.emit("input-change", e.target.value);
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  const handleLikeClick = (postId: string) => {
    const postToUpdate = posts.find((post) => post._id === postId);
    if (!postToUpdate) {
      console.error(`Post with ID ${postId} not found`);
      return;
    }

    const updatedPosts = posts.map((post) =>
      post._id === postId ? { ...post, liked: !post.liked } : post
    );

    if (!postToUpdate.liked) {
      socket.emit("like_post", { postId });
    }

    console.log(`Liked post with ID: ${postId}`);
    setPosts(updatedPosts);
  };

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          {post.imageUrl && (
            <img src={post.imageUrl} alt={post.text || "Post Image"} />
          )}
          {post.videoUrl && (
            <video src={post.videoUrl} controls width="100%" /> // Add controls
          )}
          <div className="post-content">
            <h3>{post.text}</h3>
            <div className="post-info">
              <span>{post.views} views</span>
              <button
                className={`like-button ${post.liked ? "liked" : ""}`}
                onClick={() => handleLikeClick(post._id)}
              >
                {post.liked ? "❤️ Liked" : "🤍 Like"}
              </button>
            </div>
          </div>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default Posts;
