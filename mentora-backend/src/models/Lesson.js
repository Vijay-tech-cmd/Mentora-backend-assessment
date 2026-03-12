const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  mentorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
