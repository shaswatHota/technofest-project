
import { useState } from "react";
import api from "../services/api";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const [form, setForm] = useState({ username: "", collegeName: "", start: "", end: "" });
  const navigate = useNavigate();


  const completeProfile = async ( payload) => {
    try {
      return await api.post("/api/complete-profile", payload);
      
    } catch (error) {
      console.error("Error completing profile:", error.response?.data || error.message);
      throw error;
    }
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    const token = await user.getIdToken();

    const payload = {
      username: form.username,
      collegeName: form.collegeName,
      collegeDuration: {
        start: parseInt(form.start),
        end: parseInt(form.end),
      },
    };

    await completeProfile( payload);
    navigate("/home");
  };

  return (
    <div>
      <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input placeholder="College Name" onChange={(e) => setForm({ ...form, collegeName: e.target.value })} />
      <input placeholder="Start Year" onChange={(e) => setForm({ ...form, start: e.target.value })} />
      <input placeholder="End Year" onChange={(e) => setForm({ ...form, end: e.target.value })} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateProfile;
