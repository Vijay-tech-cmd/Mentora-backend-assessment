const Student = require('../models/Student');
const User = require('../models/User');

// Create student (Parent only)
const createStudent = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ error: 'Student name is required (min 2 chars).' });
    }

    // Verify parent role
    if (req.user.role !== 'parent') {
      return res.status(403).json({ error: 'Only parents can create students.' });
    }

    const student = new Student({ 
      name: name.trim(), 
      parentId: req.user._id 
    });
    await student.save();

    // Add to parent's students array
    await User.findByIdAndUpdate(req.user._id, { 
      $push: { students: student._id } 
    });

    res.status(201).json({
      id: student._id,
      name: student.name,
      createdAt: student.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create student.' });
  }
};

// List parent's students
const getStudents = async (req, res) => {
  try {
    if (req.user.role !== 'parent') {
      return res.status(403).json({ error: 'Only parents can view students.' });
    }

    const students = await Student.find({ parentId: req.user._id })
      .populate('bookings')
      .sort({ createdAt: -1 });

    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students.' });
  }
};

module.exports = { createStudent, getStudents };
