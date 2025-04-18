const admin = require("./firebase"); // Firebase initialization
const { auth } = admin;

// Middleware to check if user is authenticated
const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authenticated. Please log in." });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await auth().verifyIdToken(token);

    // Attach decoded token to the request for use in other routes
    req.user = decodedToken; // You can use this to identify the user in other parts of your app
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }
};

module.exports = checkAuth;
