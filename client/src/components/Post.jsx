import React from "react";
//import "../styles/Post.css";

// Function to format the time in a more readable format
const formatTime = (timestamp) => {
  const postDate = new Date(timestamp);
  const now = new Date()
  const diffMs = now - postDate;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `${seconds} sec${seconds !== 1 ? 's' : ''} ago`;
  if (minutes < 60) return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
  return `${years} year${years !== 1 ? 's' : ''} ago`;

  };

function Post({ name, batch, content, time }) {
  return (
    <div className="post">
      <div className="post-header">
        <span className="batch">({batch})</span><strong>{name}</strong><span className="">{formatTime(time)}</span>
      </div>
      <p className="pl-20">{content}</p>
      
    </div>
  );
}

export default Post;
