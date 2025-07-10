const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET semua courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data courses' });
  }
});

router.post('/user/:id/add-course', async (req, res) => {
  try {
    const userId = req.params.id;
    const course = req.body; // subject, grade, description

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { myCourses: course } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambahkan kursus' });
  }
});

module.exports = router;
