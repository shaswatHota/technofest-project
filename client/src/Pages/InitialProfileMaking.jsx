// pages/InitialCreateProfile.jsx
import { useState } from "react";
import { completeProfile } from "../services/api";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const [form, setForm] = useState({ username: "", collegeName: "", start: "", end: "" });
  const navigate = useNavigate();

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

    await completeProfile(token, payload);
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
