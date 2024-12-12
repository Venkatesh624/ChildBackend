const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Import routes
const childRoutes = require('./routes/childRoutes'); 
const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const agencyRoutes = require('./routes/agencyRoutes');
const assignedAgenciesRoutes = require('./routes/assignedAgenciesRoute'); // New route added

// Initialize express app
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

// Routes
app.use('/api/children', childRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/agencies', agencyRoutes);
app.use('/api/assigned-agencies', assignedAgenciesRoutes); // New route added

// Root route
app.get('/', (req, res) => {
    res.send('Secure Lost and Found Database API is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'An internal server error occurred.' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
