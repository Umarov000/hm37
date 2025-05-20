const winston = require("winston");
const config = require('config');
require("winston-mongodb");

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, prettyPrint, json, colorize } =
  format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(label({ label: "ITTERM" }), timestamp(), myFormat),
  transports: [
    new transports.Console({ level: "silly", format: combine(colorize()) }),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combine.log", level: "info" }),
    new transports.MongoDB({ db: config.get("dbUri"), collection: 'log'}),
  ],
  exceptionHandlers: [new transports.File({ filename: "logs/exceptions.log" })],
  rejectionHandlers: [new transports.File({ filename: "logs/rejections.log" })],
});

logger.exitOnError = false;

module.exports = logger;
