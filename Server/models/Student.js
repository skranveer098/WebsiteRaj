const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  time: { type: String, required: true },
  professor: { type: String, required: true }
});

const scheduleSchema = new mongoose.Schema({
  classDate: { type: Date, required: true },
  classes: [classSchema]
});

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  enrollmentNo: { type: String, required: true, unique: true },
  emailId: { type: String, required: true },
  password: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },
  schedule: [scheduleSchema] // Add the schedule field
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;