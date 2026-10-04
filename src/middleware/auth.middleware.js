const jwt = require("jsonwebtoken");
const revokedTokens = new Set();

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (revokedTokens.has(token)) {
    return res.status(401).json({ message: "Token revoked. Please login again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // continue to controller
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.revokedTokens = revokedTokens;