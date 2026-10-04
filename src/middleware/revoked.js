// middleware/revoked.js
const RevokedToken = require('../models/RevokedToken');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    const revoked = await RevokedToken.findOne({ token });
    if (revoked) {
      return res.status(401).json({ message: 'Token revoked' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};