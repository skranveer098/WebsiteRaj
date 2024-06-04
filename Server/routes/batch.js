const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Dummy database for example purposes
let users = {};

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('A token is required for authentication');
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

// Add a new batch for the user
router.post('/api/batches', verifyToken, (req, res) => {
  const userId = req.user.id;
  const newBatch = req.body;
  if (!users[userId]) users[userId] = [];
  users[userId].push(newBatch);
  res.status(201).json({ batch: newBatch });
});

module.exports = router;
