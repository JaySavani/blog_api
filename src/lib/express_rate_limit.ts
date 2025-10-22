import { rateLimit } from 'express-rate-limit';

// configure rate limiting middleware to prevent abuse
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute time window for request limiting
  max: 60, // limit each IP to 60 requests per windowMs
  standardHeaders: 'draft-8', // Latest standard rate limit headers
  legacyHeaders: false, // Disable the deprecated `X-RateLimit-*` headers
  message: {
    error:
      'You have sent too many requests in a given amount of time. Please try again later.',
  },
});

export default limiter;
