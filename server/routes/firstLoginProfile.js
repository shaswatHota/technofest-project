import express from "express";
import admin from "../firebase.js"
import userProfileSchema from "../schemas/userProfile.js";

const router = express.Router();

router.post("/complete-profile", async (req,res)=>{

    try{
        const token = req.header.authorization?.split(" ")[1];
        const decoded = await admin.auth().verifyIdToken(token);
        const uid = decoded.uidl;

        const validated = userProfileSchema.parse(req.body);

        await admin.firestore().collection("users").doc(uid).set({
            ...validated,
            profileComplete: true
          }, { merge: true });

          res.status(200).json({ message: "Profile saved successfully" });

    }
    catch (err) {
        res.status(400).json({
          message: "Invalid profile data",
          errors: err.errors || err.message
        });
    }

});

export default router;