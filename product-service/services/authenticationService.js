// Middleware for authenticating requests
const config = require("config");
const SECERT_TOKEN = config.get("secretToken");
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    console.log(SECERT_TOKEN);
    if (!token) return res.status(401).json({ message: 'Access denied' });
    jwt.verify(token, "test", (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.user = user;
      next();
    });
};

module.exports = {
    authenticateToken
}