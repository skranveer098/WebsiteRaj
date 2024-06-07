const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // Ensure you install this package

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: {
      values: ['Male', 'Female', 'Other'],
      message: 'Gender must be Male, Female, or Other'
    }
  },
  enrollmentNo: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  endingDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return this.joiningDate < value;
      },
      message: 'Ending date must be after joining date'
    }
  },
  password: {
    type: String,
    required: true,
  },
});

const BatchSchema = new mongoose.Schema({
  href: String,
  label: String,
  description: String,
  students: {
    type: [StudentSchema],
    validate: {
      validator: function(value) {
        return value.length <= 25;
      },
      message: 'A batch can have a maximum of 25 students.'
    }
  }
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    match: [/^admin_[a-zA-Z]+\d+$/, 'Username must follow the pattern admin_<name><number>'],
  },
  password: {
    type: String,
    required: true,
  },
  batches: [BatchSchema]
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('User', UserSchema);
