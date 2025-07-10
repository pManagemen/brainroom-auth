const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  subject: String,
  grade: String,
  description: String,
  materials: [
    {
      title: String,
      description: String
    }
  ]
});

module.exports = mongoose.model('Course', courseSchema);
