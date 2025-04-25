import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { onAuthStateChanged } from "firebase/auth";

const RequireProfileComplete = ({ children }) => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.error("User not logged in");
        setChecking(false);
        return;
      }

      try {
        const token = await user.getIdToken();
        localStorage.setItem("token", token); // interceptor uses this

        const res = await api.get("/api/complete-profile");
        if (!res.data.profileComplete) {
          navigate("/initial-create-profile");
        }
      } catch (err) {
        console.error("Error checking profile", err);
      } finally {
        setChecking(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (checking) return <div>Loading...</div>;
  return children;
};

export default RequireProfileComplete;
