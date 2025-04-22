import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import api from "../services/api";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
//import "../styles/Home.css";
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
    <div className="grid grid-cols-7">
      <div className="w-screen h-20 fixed bg-[#180f1c] text-white">
        <Navbar/>
      </div>

        <div className="col-span-2"></div>

      <div className="col-span-3 border-l-2 border-r-2 border-gray-300 pl-5 pr-5">
        <div className="mt-24 bg-gray-200 rounded-3xl flex justify-start">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's happening?"
            rows="3"
            className="w-full ml-10 mt-3"
          />
          <button onClick={handlePostSubmit} className="bg-[#32193d] hover:bg-[#170f1c] rounded-r-2xl text-white w-10">Post</button>
        </div>

        <Feed refreshTrigger={refreshTrigger} /> {/* 🆕 Pass the trigger */}

      </div>

      <div className="col-span-2"></div>
    </div>
  );
};

export default Home;
