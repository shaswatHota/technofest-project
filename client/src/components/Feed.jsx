import { useEffect, useState } from "react";
import api from "../services/api";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from "./Post.jsx";

const Feed = ({ refreshTrigger }) => {
  const [posts, setPosts] = useState([]);
  

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();

        try {
          const res = await api.get("/posts", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPosts(res.data);
        } catch (err) {
          console.error("Failed to fetch posts", err);
        }
      } else {
        console.log("No user logged in");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [refreshTrigger]);

  if (loading) return <p>Loading posts...</p>; // 🆕 Re-run useEffect when refreshTrigger changes

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
