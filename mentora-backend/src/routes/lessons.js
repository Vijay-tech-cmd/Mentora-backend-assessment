const express = require('express');
const { createLesson, getLessons } = require('../controllers/lessonController');
const { auth, requireRole } = require('../middleware/auth');
const router = express.Router();

router.get('/', getLessons);

router.use(auth);
router.post('/', requireRole(['mentor']), createLesson);

module.exports = router;
