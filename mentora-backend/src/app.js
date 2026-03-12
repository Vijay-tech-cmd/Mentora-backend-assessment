require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const lessonRoutes = require('./routes/lessons');
const bookingRoutes = require('./routes/bookings');
const sessionRoutes = require('./routes/sessions');
const llmRoutes = require('./routes/llm');

const app = express();

// Middleware
console.log('helmet: function');
app.use(helmet());
console.log('cors: function');
app.use(cors());
console.log('express.json: function');
app.use(express.json({ limit: '10mb' }));

// GLOBAL REQUEST LOGGER - CRITICAL FOR DEBUG
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - HIT!`);
  next();
});


console.log('rateLimit middleware: DISABLED FOR DEBUG');
const rl = require('./middleware/rateLimit');
// app.use('/api/llm', rl);  // DISABLED

// Routes
console.log('authRoutes: loaded');
app.use('/api/auth', authRoutes);
console.log('studentRoutes: loaded');
app.use('/api/students', studentRoutes);
console.log('lessonRoutes: loaded');
app.use('/api/lessons', lessonRoutes);
console.log('bookingRoutes: loaded');
app.use('/api/bookings', bookingRoutes);
console.log('sessionRoutes: loaded');
app.use('/api/sessions', sessionRoutes);
console.log('llmRoutes: loaded');
app.use('/api/llm', llmRoutes);

// Root route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Mentora Backend API is running',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            students: '/api/students',
            lessons: '/api/lessons',
            bookings: '/api/bookings',
            sessions: '/api/sessions',
            llm: '/api/llm/summarize', 
            health: '/health'
        }
    });
});

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// 404 handler (AFTER all routes)
app.use((req, res) => {
    console.log(`404: ${req.method} ${req.path}`);
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('ERROR:', err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Something went wrong!'
    });
});

console.log('--- STARTING SERVER ---');
const PORT = process.env.PORT || 5000;

console.log('Connecting to MongoDB at:', process.env.MONGODB_URI ? 'URI FOUND' : 'URI MISSING');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    });
