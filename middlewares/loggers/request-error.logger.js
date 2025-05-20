const winston = require("winston");
const expressWinston = require("express-winston");

module.exports = expressWinston.errorLogger({
  transports: [new winston.transports.Console(),
    new winston.transports.File({filename: "logs/requestErrorLogs.log"})
  ],
  format: winston.format.combine(
    winston.format.json()
  ),
});
