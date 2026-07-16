import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per 15 minutes
  standardHeaders: 'draft-7', // Set standard RateLimit response headers
  legacyHeaders: false, // Disable old X-RateLimit headers
  message: {
    error: 'Too many requests from this IP, please try again after 15 minutes.',
  },
});
