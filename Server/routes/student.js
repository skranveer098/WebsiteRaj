const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Update the path as needed
const verifyToken = require('../midddleware/verifyToken'); // Path to your verifyToken middleware

// Add a student to a batch
router.post('/users/:userId/batches/:batchId/students', verifyToken, async (req, res) => {
  const { userId, batchId } = req.params;
  const studentData = req.body;

  try {
    // Ensure the user making the request is the owner of the data
    if (req.user.id !== userId) {
      return res.status(403).json({ message: 'Access forbidden: Unauthorized' });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the batch by ID
    const batch = user.batches.id(batchId);
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Check if the batch already has 25 students
    if (batch.students.length >= 25) {
      return res.status(400).json({ message: 'Batch already has 25 students' });
    }

    // Add the new student to the batch
    batch.students.push(studentData);

    // Save the updated user document
    await user.save();

    res.status(201).json({ message: 'Student added successfully', student: studentData });
  } catch (error) {
    console.error('Error adding student to batch:', error);
    res.status(500).json({ message: 'Error adding student to batch' });
  }
});

module.exports = router;
