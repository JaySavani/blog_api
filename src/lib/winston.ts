import config from '@/config';
import winston from 'winston';

const { combine, timestamp, printf, colorize, errors, json, align } =
  winston.format;

//
const transports: winston.transport[] = [];

if (config.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss A' }),
        align(),
        printf(({ timestamp, level, message, ...meta }) => {
          const metaString = Object.keys(meta).length
            ? `\n${JSON.stringify(meta, null, 2)}`
            : '';
          return `${timestamp} [${level}]: ${message}${metaString}`;
        }),
      ),
    }),
  );
}

export const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: combine(errors({ stack: true }), timestamp(), json(), align()),
  transports,
  silent: config.NODE_ENV === 'test',
});
