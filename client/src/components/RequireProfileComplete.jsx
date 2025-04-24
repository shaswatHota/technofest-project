
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { getUserToken } from "../services/authUtil";

const RequireProfileComplete = ({ children }) => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const user = auth.currentUser;
        const token = await getUserToken();
        localStorage.setItem("token", token); // interceptor uses this

        const res = await api.get("/api/complete-profile"); // you'll build this
        if (!res.data.profileComplete) {
          navigate("/initial-create-profile");
        }
      } catch (err) {
        console.error("Error checking profile", err);
      } finally {
        setChecking(false);
      }
    };

    checkProfile();
  }, [navigate]);

  if (checking) return <div>Loading...</div>;
  return children;
};

export default RequireProfileComplete;
