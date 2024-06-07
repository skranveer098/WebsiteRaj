const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Update the path as needed
const verifyToken = require('../midddleware/verifyToken'); // Path to your verifyToken middleware

// Add a new batch for the user
router.post('/', verifyToken, async (req, res) => {
  const userId = req.user.id;
  const newBatch = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.batches = user.batches || [];
    user.batches.push(newBatch);
    await user.save();

    res.status(201).json({ message: 'Batch added successfully', batch: newBatch });
  } catch (error) {
    console.error('Error saving batch:', error);
    res.status(500).json({ message: 'Error saving batch' });
  }
});

module.exports = router;
