const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'supersecretkey';
const expiration = '2h';

/**
 * Middleware to verify JWTs
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - Callback to pass control to the next middleware.
 */
const authMiddleware = (req, res, next) => {

  // Get the token from headers, query, or body

  let token =
    req.headers.authorization?.split(' ').pop().trim() ||
    req.query.token ||
    req.body.token;

  // If no token is provided, move to the next

  if (!token) {
    return next();
  }

  try {

    // Verify the token and attach the user data to the request object

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (err) {
    console.error('Invalid token:', err.message);
    res.status(401).json({ message: 'Invalid or expired token.' });
    return;
  }

  // Pass control to the next middleware
  
  next();
};

module.exports = { authMiddleware };
