const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const bodyParser = require('body-parser');

// Middleware to parse JSON bodies
router.use(bodyParser.json());

// Register
router.post('/register', async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Validate the username pattern
    const usernamePattern = /^admin_[a-zA-Z]+\d+$/;
    if (!usernamePattern.test(username)) {
      return res.status(400).json({ msg: 'Username must follow the pattern: admin_name12' });
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User instance and save it to the database
    user = new User({
      name,
      email: email.toLowerCase(),
      username,
      password: hashedPassword,
    });

    await user.save();

    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    // Check for validation errors
    if (err.name === 'ValidationError') {
      let messages = [];
      for (field in err.errors) {
        messages.push(err.errors[field].message);
      }
      return res.status(400).json({ msg: messages.join(', ') });
    }
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validate the username pattern
    const usernamePattern = /^admin_[a-zA-Z]+\d+$/;
    if (!usernamePattern.test(username)) {
      return res.status(400).json({ msg: 'Invalid Username Pattern' });
    }

    // Find the user by username
    let user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    res.json({ msg: 'Login successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
