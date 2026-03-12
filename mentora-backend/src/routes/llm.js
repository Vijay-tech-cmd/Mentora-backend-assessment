const express = require('express');
const { summarizeText } = require('../controllers/llmController');
const router = express.Router(); // Public endpoint

router.post('/summarize', summarizeText);

module.exports = router;
