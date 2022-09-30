/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

const winston = require("winston");
require('winston-daily-rotate-file');
const os = require("os");
const fs = require("fs");

const isDevelopment = process.env.NODE_ENV == "development";
const hostname = os.hostname();

const vulxLogsPath = `${os.homedir()}/AppData/Local/Vulx/logs/`;

if (!fs.existsSync(vulxLogsPath)) {
	fs.mkdirSync(vulxLogsPath, { recursive: true });
}

const Logger = winston.createLogger({
  level: isDevelopment ? "debug" : "info",
  format: winston.format.json(),
  defaultMeta: { service: 'vulx' },
  transports: [
    new winston.transports.File({ filename: vulxLogsPath + "error.log", level: "error" }),
    new winston.transports.DailyRotateFile({ filename: vulxLogsPath + "combined-%DATE%.log", level: "debug", datePattern: "YYYY-MM-DD", maxFiles: "7d" }),
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