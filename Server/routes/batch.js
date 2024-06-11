const express = require('express');
const Batch = require('../models/Batch');
const router = express.Router();

// Create a new batch
router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { name, description } = req.body;
    const batch = await new  Batch({ name, description }).save();
    res.status(201).send(batch);
  } catch (err) {
    console.error('Error creating batch:', err.message);
    res.status(400).send({ error: err.message });
  }
});


// Get all batches
router.get('/', async (req, res) => {
  try {
    const batches = await Batch.find();
    res.status(200).send(batches);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a batch by ID
router.get('/:id', async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);
    if (!batch) {
      return res.status(404).send('Batch not found');
    }
    res.status(200).send(batch);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a batch
router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const batch = await Batch.findByIdAndUpdate(
      req.params.id, 
      { name, description }, 
      { new: true, runValidators: true }
    );
    if (!batch) {
      return res.status(404).send('Batch not found');
    }
    res.status(200).send(batch);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a batch
router.delete('/:id', async (req, res) => {
  try {
    const batch = await Batch.findByIdAndDelete(req.params.id);
    if (!batch) {
      return res.status(404).send('Batch not found');
    }
    res.status(200).send('Batch deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;