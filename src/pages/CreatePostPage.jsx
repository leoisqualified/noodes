import React, { useState } from "react";

const CreatePostPage = () => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload post");
      }

      alert("Post uploaded successfully!");
      setCaption("");
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Error uploading post.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Create Post</h2>

        <input
          type="file"
          accept="image/*,video/*"
          className="w-full mb-3"
          onChange={handleFileChange}
          required
        />

        <textarea
          placeholder="Write a caption..."
          className="w-full p-2 border rounded mb-3"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
