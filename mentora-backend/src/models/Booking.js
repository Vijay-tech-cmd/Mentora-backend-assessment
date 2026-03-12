const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true 
  },
  lessonId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Lesson', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['booked', 'completed', 'cancelled'], 
    default: 'booked' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
