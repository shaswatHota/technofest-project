import React from 'react';
import '../styles/Post.css';

function Post({ name, batch, content, time }) {
  return (
    <div className="post">
      <div className="post-header">
        <strong>{name}</strong> <span className="batch">({batch})</span>
      </div>
      <p className="post-content">{content}</p>
      <div className="post-time">{time}</div>
    </div>
  );
}

export default Post;
