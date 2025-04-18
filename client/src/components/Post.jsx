import React from "react";
import "../styles/Post.css";

// Function to format the time in a more readable format
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // This will display time in a readable format like 'MM/DD/YYYY, HH:MM AM/PM'
};

function Post({ name, batch, content, time }) {
  return (
    <div className="post">
      <div className="post-header">
        <strong>{name}</strong> <span className="batch">({batch})</span>
      </div>
      <p className="post-content">{content}</p>
      <div className="post-time">{formatTime(time)}</div>
    </div>
  );
}

export default Post;
