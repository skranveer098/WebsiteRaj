const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Your User model

// @route   GET api/profile/:username
// @desc    Get user profile by username
// @access  Public (or you can restrict it as per your requirement)
router.get('/:username', async (req, res) => {
  try {
    const username = req.params.username;
    // Get user from database without password field
    const user = await User.findOne({ username }).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
