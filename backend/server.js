require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Environment Variables
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecoCycleDB';

// ✅ MongoDB Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err.message));

// ✅ Routes
const authRoutes = require('./routes/auth');
const wasteRoutes = require('./routes/waste');
const productRoutes = require('./routes/product');
const adminRoutes = require('./routes/admin');

// ✅ Route Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/waste', wasteRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

// ✅ Default Route
app.get('/', (req, res) => {
  res.json({ success: true, message: 'EcoCycle Backend API is running successfully!' });
});

// ✅ Server Start
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

