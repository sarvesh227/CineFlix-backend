const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/userRoutes'));
app.use('/api/watchlist', require('./routes/watchlistRoutes'));
app.use('/api/watched', require('./routes/watchedRoutes'));

// Basic Route
app.get('/', (req, res) => {
    res.send('CineFlix Backend is running!');
});

// Database Connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Start Server
const PORT = process.env.PORT || 5000;

// Connect to DB and start listening
if (process.env.MONGO_URI) {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    });
} else {
    console.warn("MONGO_URI not found in .env. Server not started/DB not connected.");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} (No DB Connection)`);
    });
}
