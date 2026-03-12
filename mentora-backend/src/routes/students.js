const express = require('express');
const { createStudent, getStudents } = require('../controllers/studentController');
const { auth, requireRole } = require('../middleware/auth');
const router = express.Router();

router.use(auth);
router.post('/', requireRole(['parent']), createStudent);
router.get('/', requireRole(['parent']), getStudents);

module.exports = router;
