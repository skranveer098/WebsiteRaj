const express = require('express');
const Batch = require('../models/Batch');
const router = express.Router();

// Create a new batch
router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { name, description } = req.body;
    const batch = await new  Batch({ name, description, object:[]}).save();
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

router.post('/getObjectId', async (req, res) => {
  const newBatch = req.body;

  try {
    const result = await db.collection('batches').insertOne(newBatch);

    res.status(200).json({ _id: result.insertedId });
    client.close();
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch object ID' });
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