// modules/middlewares.js

import logger from '../logger.js';
import basicAuth from 'basic-auth';


/**
 * Error handling middleware for Express.
 * Logs the error and sends a generic error message to the client.
 */
export function errorHandler(err, req, res, next) {
    logger.error(`Error occurred: ${err.message}`, { errorMessage: err.message, stack: err.stack });
    res.status(500).send('Internal Server Error');
}

/**
 * Authentication middleware for Express.
 * Checks the request's Basic Auth credentials and proceeds if they match the expected admin credentials.
 */
export function auth(req, res, next) {
    const user = basicAuth(req); // Parse the request headers

    if (!user || user.name !== 'admin' || user.pass !== 'tim-the-goat') {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        logger.debug('Authentication failed');
        return res.status(401).send('Authorization Required');
    }
    logger.debug('Authentication successful');

    next(); // The user is authenticated, continue to the next middleware
}

/**
 * Request and response logging middleware for Express.
 * Logs the details of the request and the response time after the response is sent.
 */
export function logRequestsResponse(req, res, next) {
    const startHrTime = process.hrtime();

    res.on('finish', () => {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

        logger.info(`method: ${req.method}, url: ${req.url}, Response time: ${elapsedTimeInMs}ms, 
        body: ${JSON.stringify(req.body)}, query: ${JSON.stringify(req.query)} status: ${res.statusCode},
        response: ${JSON.stringify(res.body)}`);
    });

    next();
}