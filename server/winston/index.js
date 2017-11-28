const winston = require('winston');
const fs 	  = require('fs');
const path 	  = require('path');
const env 	  = process.env.NODE_ENV || 'development';

var logFullDir  = 'server/logs';
var logDirectory = path.join(__dirname, '../logs');
 
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

module.exports = new winston.Logger({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      level: 'info',
      handleExceptions: env === 'development' ? false : true,
      exitOnError: false
    }),
    new (require('winston-daily-rotate-file'))({
      filename: `${logFullDir}/-errors.log`,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: env === 'development' ? 'verbose' : 'info',
      handleExceptions: env === 'development' ? false : true,
      exitOnError: false
    })
  ]
});