import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts") // Update with your backend route
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const handleLike = (postId) => {
    if (!user) return alert("You must log in to like a post.");

    fetch(`http://localhost:5000/api/posts/${postId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((updatedPost) => {
        setPosts(
          posts.map((post) =>
            post._id === updatedPost._id ? updatedPost : post
          )
        );
      })
      .catch((err) => console.error("Error liking post:", err));
  };

  return (
    <div className="container mx-auto p-4">
      {posts.length === 0 ? (
        <p className="text-center text-black-500">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="border p-4 rounded-lg shadow-md bg-white"
            >
              {post.type === "video" ? (
                <video controls className="w-full rounded">
                  <source src={post.mediaUrl} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={post.mediaUrl}
                  alt="Post"
                  className="w-full rounded"
                />
              )}
              <div className="mt-2 flex justify-between items-center">
                <button
                  onClick={() => handleLike(post._id)}
                  className="text-blue-500"
                >
                  👍 {post.likes.length}
                </button>
                <Link
                  to={`/post/${post._id}`}
                  className="text-gray-500 hover:underline"
                >
                  💬 {post.comments.length} Comments
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
