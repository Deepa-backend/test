
require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');

const userRouter = require('./router/UserRouter')
const MONGO_URI = process.env.MONGO_URI;
console.log('Connecting to:', MONGO_URI);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Stop app if DB fails
  });
const app = express();
app.use(express.json());

app.use('/api',userRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
