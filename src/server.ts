import express from 'express';
import config from '@/config';
import cors from 'cors';
import type { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from '@/lib/express_rate_limit';
import v1Routes from '@/routes/v1';
import { connectToDatabase, disconnectFromDatabase } from '@/lib/mongoose';
import { logger } from '@/lib/winston';
const app = express();

const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (
      config.NODE_ENV === 'development' ||
      config.WHITELISTED_ORIGINS.includes(requestOrigin || '')
    ) {
      callback(null, true);
    } else {
      callback(new Error(`CORS Error: ${requestOrigin} is not allowed`), false);
      logger.warn(`CORS Error: ${requestOrigin} is not allowed`);
    }
  },
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Enable URL-encoded request body parsing with extended option
// 'extended: true' allows for rich objects and arrays to be encoded
// into the URL-encoded format, using the qs library.
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Enable response compression to reduce payload size and improve performance
app.use(
  compression({
    threshold: 1024, // Only compress responses larger than 1KB
  }),
);

// use helmet for setting various HTTP headers for app security
app.use(helmet());

// Apply rate limiting middleware to prevent excessive requests and enhance security
app.use(rateLimit);

(async () => {
  try {
    await connectToDatabase();
    app.use('/api/v1', v1Routes);
    app.listen(config.port, () => {
      logger.info(`Server is running on http://localhost:${config.port}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    if (config.NODE_ENV === 'development') {
      process.exit(1);
    }
  }
})();

const handleServerShutdown = async () => {
  try {
    await disconnectFromDatabase();
    logger.warn('Server shut down successfully.');
    process.exit(0);
  } catch (error) {
    logger.error('Error during server shutdown:', error);
  }
};

// Handle termination signals for graceful shutdown
// 'SIGTERM' is triggered when the process is terminated by kill command or system shutdown
// 'SIGINT' is triggered when the user interrupts the process (e.g., Ctrl+C in terminal)
process.on('SIGTERM', handleServerShutdown);
process.on('SIGINT', handleServerShutdown);
