const express = require("express");
const cors = require("cors");
const admin = require("./firebase");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/verify-token", async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.json({ success: true, uid: decodedToken.uid });
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
