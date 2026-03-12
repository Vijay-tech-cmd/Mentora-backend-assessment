const Booking = require('../models/Booking');
const Lesson = require('../models/Lesson');
const Student = require('../models/Student');

// Create booking (Parent only)
const createBooking = async (req, res) => {
  try {
    const { studentId, lessonId } = req.body;

    if (!studentId || !lessonId) {
      return res.status(400).json({ error: 'studentId and lessonId required.' });
    }

    if (req.user.role !== 'parent') {
      return res.status(403).json({ error: 'Only parents can book lessons.' });
    }

    // Verify student belongs to parent
    const student = await Student.findOne({ 
      _id: studentId, 
      parentId: req.user._id 
    });
    if (!student) {
      return res.status(400).json({ error: 'Student not found or access denied.' });
    }

    // Check lesson exists
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found.' });
    }

    // Check if already booked
    const existingBooking = await Booking.findOne({ 
      studentId, 
      lessonId 
    });
    if (existingBooking) {
      return res.status(400).json({ error: 'Student already booked for this lesson.' });
    }

    const booking = new Booking({ studentId, lessonId });
    await booking.save();

    // Update references
    await Student.findByIdAndUpdate(studentId, { $push: { bookings: booking._id } });
    await Lesson.findByIdAndUpdate(lessonId, { $push: { bookings: booking._id } });

    res.status(201).json({
      id: booking._id,
      studentId: booking.studentId,
      lessonId: booking.lessonId,
      status: booking.status
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking.' });
  }
};

// Get parent's bookings
const getBookings = async (req, res) => {
  try {
    if (req.user.role !== 'parent') {
      return res.status(403).json({ error: 'Only parents can view bookings.' });
    }

    const bookings = await Booking.find({ 
      studentId: { $in: await Student.find({ parentId: req.user._id }, '_id') } 
    })
    .populate('studentId', 'name')
    .populate('lessonId', 'title mentorId')
    .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings.' });
  }
};

module.exports = { createBooking, getBookings };
