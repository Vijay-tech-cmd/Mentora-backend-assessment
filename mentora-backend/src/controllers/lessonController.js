const Lesson = require('../models/Lesson');

// Create lesson (Mentor only)
const createLesson = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description required.' });
    }

    if (title.length < 3 || description.length < 10) {
      return res.status(400).json({ error: 'Title min 3 chars, description min 10 chars.' });
    }

    if (req.user.role !== 'mentor') {
      return res.status(403).json({ error: 'Only mentors can create lessons.' });
    }

    const lesson = new Lesson({ 
      title: title.trim(), 
      description: description.trim(), 
      mentorId: req.user._id 
    });
    await lesson.save();

    res.status(201).json({
      id: lesson._id,
      title: lesson.title,
      description: lesson.description,
      mentorId: lesson.mentorId
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lesson.' });
  }
};

// Get all lessons (Public)
const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find()
      .populate('mentorId', 'name')
      .populate('sessions')
      .sort({ createdAt: -1 });
    
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lessons.' });
  }
};

module.exports = { createLesson, getLessons };
