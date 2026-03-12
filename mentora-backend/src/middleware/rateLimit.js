const { rateLimit } = require('express-rate-limit');

const llmLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 requests per window
    message: { error: 'Too many summarize requests. Try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = llmLimiter;
