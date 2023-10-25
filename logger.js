import winston from 'winston';

// Create a logger instance
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log'}),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
  ]
});

// Log messages using different log levels
// logger.error('An error occurred.');
// logger.warn('A warning message.');
// logger.info('An informative log message.');
// logger.debug('A debugging log message.');
// logger.verbose('A verbose log message.');

export default logger