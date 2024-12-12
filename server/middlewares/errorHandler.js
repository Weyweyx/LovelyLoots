/**
 * Global error handling middleware for the server.
 *
 * @param {Object} err - The error object.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - Callback to pass control to the next middleware.
 */
const errorHandler = (err, req, res, next) => {
    console.error(`Error: ${err.message}`);
  
    // Check if the error is an operational error

    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Internal Server Error';
  
    // Send a JSON response with the error details
    
    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
  };
  
  module.exports = errorHandler;
  