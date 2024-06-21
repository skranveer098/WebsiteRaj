const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
const router = express.Router();
const Student = require('../models/Student');

dotenv.config();
const JWT_SECRET = process.env.jwt_secret;

// Register
router.post('/register', async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
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
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.jwt_secret, { expiresIn: '365d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

router.post('/student_login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the student by username
    const student = await Student.findOne({ username });
    if (!student) {
      return res.status(400).json({ status: "error", message: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ status: "error", message: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: student._id }, JWT_SECRET, { expiresIn: '365d' });

    res.status(200).json({ status: "success", message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});


module.exports = router;
