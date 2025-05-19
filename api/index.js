// api/index.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('../router/UserRouter');

const app = express();
app.use(express.json());
app.use('/api', userRouter);

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

module.exports = async (req, res) => {
  await connectDB();
  return app(req, res); // Handle request with Express
};
