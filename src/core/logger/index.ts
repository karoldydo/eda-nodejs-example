import * as winston from 'winston';

const format = () => {
  return new Date().toLocaleString('pl-PL', {
    timeZone: 'Europe/Warsaw',
  });
};

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  level: 'info',
  transports: [
    new winston.transports.Console({
      level: 'info',
    }),
  ],
});

export default logger;
