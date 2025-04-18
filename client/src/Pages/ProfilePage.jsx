import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Make sure db is exported from firebase.js
import "../styles/Profile.css";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userDoc = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDoc);

        if (userSnap.exists()) {
          setUserProfile(userSnap.data());
        } else {
          console.log("No user data found.");
        }
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="profile-container">
      <h2>👤 My Profile</h2>

      {userProfile ? (
        <div className="profile-card">
          <h3>{userProfile.name}</h3>
          <p><strong>Batch:</strong> {userProfile.batch}</p>
          <p><strong>Bio:</strong> {userProfile.bio}</p>
          <p><strong>LinkedIn:</strong> <a href={userProfile.linkedin} target="_blank" rel="noopener noreferrer">{userProfile.linkedin}</a></p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
