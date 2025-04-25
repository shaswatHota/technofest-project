const profileRoutes = require("./routes/checkProfile");


const express = require("express");
const cors = require("cors");
const admin = require("./firebase");
const { getFirestore } = require("firebase-admin/firestore");
const checkAuth = require("./authMiddleware"); // Import the middleware

const app = express();
app.use(cors());
app.use(express.json());

const db = getFirestore();

// Verify Token Route
app.post("/verify-token", async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email } = decodedToken;

    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    // If user doesn't exist in Firestore, add them
    if (!userDoc.exists) {
      await userRef.set({
        uid,
        email: email || "", // fallback if missing
        createdAt: new Date().toISOString(),
      });
    }

    res.json({ success: true, uid });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

//first profile building endpoint
app.use("/api", profileRoutes);


// Create Post Route with Authentication Middleware
app.post("/create-post", checkAuth, async (req, res) => {
  const { content, time } = req.body;
  const { uid } = req.user; // The user data from the decoded token

  try {
    // Save the post to Firestore
    await db.collection("posts").add({ uid, content, time });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Get Posts Route
app.get("/posts", checkAuth, async (req, res) => {
  try {
    const snapshot = await db.collection("posts").orderBy("time", "desc").get();
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const enrichedPosts = await Promise.all(
      posts.map(async post => {
        try {
          const userDoc = await admin.firestore().collection("users").doc(post.uid).get();
          const userData = userDoc.exists ? userDoc.data() : {};

          return {
            ...post,
            username: userData.username || "Unknown",
            // Add more fields if needed:
            // profilePicture: userData.profilePicture || null,
            // collegeName: userData.collegeName || "Unknown College",
          };
        } catch (err) {
          console.error(`❌ Error enriching post ${post.id}:`, err);
          return {
            ...post,
            username: "Error",
          };
        }
      })
    );

    res.status(200).json(enrichedPosts);

  } catch (err) {
    console.error("❌ Error fetching posts:", err);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
