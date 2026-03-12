const express = require('express');
const { createBooking, getBookings } = require('../controllers/bookingController');
const { auth, requireRole } = require('../middleware/auth');
const router = express.Router();

router.use(auth);
router.post('/', requireRole(['parent']), createBooking);
router.get('/', requireRole(['parent']), getBookings);

module.exports = router;
