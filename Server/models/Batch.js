const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  name: { type: String, required: true,unique:true },
  description: { type: String },
});

const Batch = mongoose.model('Batch', batchSchema);
module.exports = Batch;