"use client";

import React, { useState, useEffect } from "react";
import "../globals.css";

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

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  const handleLikeClick = (postId: string) => {
    console.log(`Liked post with ID: ${postId}`);
    setPosts(
      posts.map((post) =>
        post._id === postId ? { ...post, liked: !post.liked } : post
      )
    );
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
    </div>
  );
};

export default Posts;
