import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import api from "../services/api";
import Feed from "../components/Feed";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [postContent, setPostContent] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0); // 🆕 Add trigger
  const navigate = useNavigate();

  const handlePostSubmit = async () => {
    if (!postContent) return;

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      navigate("/signup");
      return;
    }

    const token = await user.getIdToken();

    try {
      await api.post(
        "/create-post",
        { content: postContent, time: new Date().toISOString() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPostContent("");
      setRefreshTrigger((prev) => prev + 1); // 🆕 Trigger Feed refresh
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h2>Welcome to Alumni Connect</h2>
      </div>

      <div className="post-input">
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What's happening?"
          rows="3"
        />
        <button onClick={handlePostSubmit} className="bg-blue-500">Post</button>
      </div>

      <Feed refreshTrigger={refreshTrigger} /> {/* 🆕 Pass the trigger */}
    </div>
  );
};

export default Home;
