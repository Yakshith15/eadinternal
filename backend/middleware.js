const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    // console.log("Token:", token);
    // console.log("JWT Secret:", process.env.JWT_SECRET);
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = auth;
