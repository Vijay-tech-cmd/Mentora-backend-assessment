const express = require('express');
const { createSession, getSessions } = require('../controllers/sessionController');
const { auth, requireRole } = require('../middleware/auth');
const router = express.Router();

router.get('/lessons/:id', getSessions);
router.use(auth);
router.post('/', requireRole(['mentor']), createSession);

module.exports = router;
