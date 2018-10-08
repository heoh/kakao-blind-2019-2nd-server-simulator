const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const fs = require('fs');
const logDir = 'log';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const myFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});
const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    level: 'info',
    transports: [
        new transports.Console({
            level: 'info'
        }),
        new transports.File({
            filename: `${logDir}/error.log`,
            level: 'error'
        }),
        new transports.File({ 
            filename: `${logDir}/logs.log`,
            maxsize: 1000000,
            maxFiles: 20
        })
    ]
  });
  

module.exports = logger;
