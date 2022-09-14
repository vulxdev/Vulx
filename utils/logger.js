const winston = require("winston");
const os = require("os");

const isDevelopment = process.env.NODE_ENV == "development";
const hostname = os.hostname();

const Logger = winston.createLogger({
  level: isDevelopment ? "debug" : "info",
  format: winston.format.json(),
  defaultMeta: { service: 'vulx' },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log", level: "debug" }),
	new winston.transports.Console({
		format: winston.format.combine(
			winston.format.timestamp(),
			winston.format.metadata({
				fillExcept: ["timestamp", "service", "level", "message"],
		}),
		winston.format.colorize(),
		winstonConsoleFormat()
		),
	}),
  ],
});


function winstonConsoleFormat() {
  return winston.format.printf(({ timestamp, service, level, message }) => {
    return `[${timestamp}][${level}][${service}@${hostname}] ${message}`;
  });
}

module.exports = Logger;