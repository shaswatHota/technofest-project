import { useEffect, useState } from "react";
import api from "../services/api";
import Post from "./Post.jsx";

const Feed = ({ refreshTrigger }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };

    getPosts();
  }, [refreshTrigger]); // 🆕 Re-run useEffect when refreshTrigger changes

  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            name={post.name}
            batch={post.batch}
            content={post.content}
            time={new Date(post.time).toLocaleString()}
          />
        ))
      )}
    </div>
  );
};

export default Feed;
