// middleware.js
const path = require('path');
const winston = require('winston');
const fs = require('fs');
const moment = require('moment');
// Create logs folder if it doesn't exist
const rootPath = './';
const logsFolderPath = path.join(rootPath, 'logs');
if (!fs.existsSync(logsFolderPath)) {
  fs.mkdirSync(logsFolderPath);
}
const customFormat = winston.format.printf(({ level, message, timestamp, method, error, line }) => {
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${method} - ${message}`;
  if (error) {
    return `${logMessage}\n${error.stack}`;
  }
  return logMessage;
});
const currentDate = new Date();
var formattedDate = moment(currentDate).format('YYYY-MM-DD');
const logFileName = `${formattedDate}.log`;
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }), // Enable error handling
    winston.format.splat(),
    winston.format.simple(),
    winston.format.printf(info => {
      const { timestamp, level, message, ...args } = info;
      const rest = Object.keys(args).length ? JSON.stringify(args, null, 2) : '';
      return `[${timestamp}] [${level.toUpperCase()}]: ${message} ${rest}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        customFormat
      )
    }),
    new winston.transports.File({
      filename: path.join(logsFolderPath, logFileName),
      format: customFormat
    }),
  ],
});

const requestLogger = (req, res, next) => {
  const logInfo = {
    method: req.method,
    url: req.url,
    line: new Error().stack.split('\n')[2].trim().split(' ')[1],
  };

  logger.info(`Handling ${req.method} ${req.url}`, { ...logInfo });

  next();
};

module.exports = { requestLogger, logger };
