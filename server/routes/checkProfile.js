const express = require("express");
const admin = require("../firebase.js");
const userProfileSchema = require("../schemas/userProfile.js");

const router = express.Router();

router.post("/complete-profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;

    const validated = userProfileSchema.parse(req.body);

    await admin.firestore().collection("users").doc(uid).set({
      ...validated,
      profileComplete: true
    }, { merge: true });

    res.status(200).json({ message: "Profile saved successfully" });

  } catch (err) {
    console.error("Profile error:", err);
    res.status(400).json({
      message: "Invalid profile data",
      errors: err.errors || err.message
    });
  }
});

router.get("/complete-profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;

    const doc = await admin.firestore().collection("users").doc(uid).get();
    const data = doc.data();

    res.status(200).json({ profileComplete: data?.profileComplete || false });
  } catch (err) {
    console.error("Error checking profile:", err);
    res.status(400).json({ message: "Error checking profile", error: err.message });
  }
});


module.exports = router;
