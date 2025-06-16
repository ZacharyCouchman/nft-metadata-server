import winston, { transport, format } from "winston";

const transportsArray: transport[] = [
  new winston.transports.Console({
    format: format.combine(
      format.colorize(),
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.printf((info) => {
        // If info.message is an object, pretty print it. Otherwise, leave it as is.
        const message = typeof info.message === "object" ? JSON.stringify(info.message, null, 2) : info.message;
        return `[${info.timestamp}][${info.level}]${message}`;
      })
    ),
  }),
  // ... other code
];

const logger = winston.createLogger({
  level: 'debug',
  transports: transportsArray,
});

export default logger;
