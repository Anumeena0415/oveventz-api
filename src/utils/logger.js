const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Define log levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Define colors for each level
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

// Tell winston that you want to link the colors
winston.addColors(colors);

// Define which level to log based on environment
const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};

// Define different log formats
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
);

const fileLogFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.printf(
        (info) => {
            if (info.stack) {
                return JSON.stringify({
                    timestamp: info.timestamp,
                    level: info.level,
                    message: info.message,
                    stack: info.stack,
                    ...info
                });
            }
            return JSON.stringify({
                timestamp: info.timestamp,
                level: info.level,
                message: info.message,
                ...info
            });
        }
    ),
);

// Define transports (where logs are stored)
const transports = [
    // Console transport for development
    new winston.transports.Console({
        format: logFormat,
    }),

    // Error log file
    new winston.transports.File({
        filename: path.join(logsDir, 'error.log'),
        level: 'error',
        format: fileLogFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    }),

    // Combined log file
    new winston.transports.File({
        filename: path.join(logsDir, 'combined.log'),
        format: fileLogFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    }),

    // HTTP requests log file
    new winston.transports.File({
        filename: path.join(logsDir, 'http.log'),
        level: 'http',
        format: fileLogFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    }),
];

// Create the logger
const logger = winston.createLogger({
    level: level(),
    levels,
    transports,
    exitOnError: false,
});

// Create a stream object for Morgan HTTP logger
logger.stream = {
    write: (message) => logger.http(message.trim()),
};

// Custom logging methods
logger.logAPIRequest = (req, res, responseTime) => {
    logger.info('API Request', {
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        responseTime: `${responseTime}ms`,
        statusCode: res.statusCode,
        userId: req.user?.id || 'anonymous',
    });
};

logger.logAPIError = (error, req) => {
    logger.error('API Error', {
        message: error.message,
        stack: error.stack,
        method: req?.method,
        url: req?.url,
        ip: req?.ip,
        userId: req?.user?.id || 'anonymous',
        body: req?.body,
        query: req?.query,
        params: req?.params,
    });
};

logger.logDatabaseOperation = (operation, collection, documentId, duration) => {
    logger.info('Database Operation', {
        operation,
        collection,
        documentId,
        duration: `${duration}ms`,
    });
};

logger.logSecurityEvent = (event, details) => {
    logger.warn('Security Event', {
        event,
        ...details,
        timestamp: new Date().toISOString(),
    });
};

logger.logBusinessEvent = (event, details) => {
    logger.info('Business Event', {
        event,
        ...details,
        timestamp: new Date().toISOString(),
    });
};

module.exports = logger;