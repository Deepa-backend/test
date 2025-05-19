// api/index.js
const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
require('dotenv').config();

const userRouter = require('../router/UserRouter');

const app = express();
app.use(express.json());
app.use('/api', userRouter);

// MongoDB connection caching for Vercel
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
  console.log('✅ MongoDB connected');
}

// Wrap Express app for Vercel
const handler = serverless(app);

// Main serverless function export
module.exports = async (req, res) => {
  await connectDB();
  return handler(req, res); // ✅ this handles the Express app correctly
};
