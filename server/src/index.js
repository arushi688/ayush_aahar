/**
 * @file index.js
 * @description Ayush Aahar API Server - Entry Point
 * @author Ayush Aahar Dev Team
 * @version 1.0.0
 * 
 * OWASP Compliance:
 * - Helmet for security headers
 * - CORS configured
 * - Rate limiting applied
 * - Input validation on POST routes
 * 
 * JIRA: AYUSH-001 #time 4h #comment Backend server setup with security middleware
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const productRoutes = require('./routes/products');
const traceabilityRoutes = require('./routes/traceability');
const qualityRoutes = require('./routes/quality');
const app = express();
const PORT = process.env.PORT || 5001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10kb' }));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/traceability', traceabilityRoutes);
app.use('/api/quality', qualityRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Ayush Aahar API', timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Ayush Aahar API Server running on port ${PORT}`);
});

module.exports = app;
