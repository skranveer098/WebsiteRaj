const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// const express = require('express');
// const router = express.Router();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI  )
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/batches', require('./routes/batch'));
// app.use('/api', require('./routes/student'));
// app.use('/api/protected', require('./routes/protected'));

// Catch-all route for 404
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
