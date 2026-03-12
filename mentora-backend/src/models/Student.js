const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  parentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true 
  },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
