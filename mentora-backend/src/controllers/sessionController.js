const Session = require('../models/Session');
const Lesson = require('../models/Lesson');

// Create session for lesson (Mentor only)
const createSession = async (req, res) => {
  try {
    const { lessonId, date, topic } = req.body;

    if (!lessonId || !date || !topic) {
      return res.status(400).json({ error: 'lessonId, date, and topic required.' });
    }

    if (req.user.role !== 'mentor') {
      return res.status(403).json({ error: 'Only mentors can create sessions.' });
    }

    const lesson = await Lesson.findOne({ 
      _id: lessonId, 
      mentorId: req.user._id 
    });
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found or access denied.' });
    }

    const session = new Session({ lessonId, date, topic });
    await session.save();

    await Lesson.findByIdAndUpdate(lessonId, { $push: { sessions: session._id } });

    res.status(201).json({
      id: session._id,
      lessonId: session.lessonId,
      date: session.date,
      topic: session.topic
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create session.' });
  }
};

// Get sessions for lesson
const getSessions = async (req, res) => {
  try {
    const { id } = req.params;  

    const sessions = await Session.find({ lessonId: id })
      .sort({ date: 1 });

    res.json({
      lessonId: id,
      sessions: sessions
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions.' });
  }
};


module.exports = { createSession, getSessions };
