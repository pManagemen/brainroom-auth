const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB terkoneksi'))
.catch((err) => console.error('❌ Gagal koneksi MongoDB:', err));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

//daftar kursus
const courseRoutes = require('./routes/courses');
app.use('/api/', courseRoutes);

// Tes route utama
app.get('/', (req, res) => {
  res.send('Server Brainroom aktif! 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

console.log('MONGO_URI dari .env:', process.env.MONGO_URI);

