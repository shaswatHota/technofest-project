import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profile Page</h2>
      {userData ? (
        <div>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Batch:</strong> {userData.batch}</p>
          <p><strong>Bio:</strong> {userData.bio}</p>
          <p><strong>LinkedIn:</strong> <a href={userData.linkedin} target="_blank">{userData.linkedin}</a></p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
