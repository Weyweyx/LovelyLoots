const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'supersecretkey';
const expiration = '2h';

/**
 * Generate a JSON Web Token for a user.
 * 
 * @param {Object} user - The user object, typically containing `_id`, `username`, and `email`.
 * @returns {String} - Signed JWT token.
 */
const generateToken = ({ _id, firstName, lastName, email }) => {
  const payload = { _id, firstName, lastName, email };
  return jwt.sign(payload, secret, { expiresIn: expiration });
};

/**
 * Verify a JSON Web Token.
 * 
 * @param {String} token - The token to verify.
 * @returns {Object|Boolean} - Decoded token payload if valid, otherwise `false`.
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error('Invalid token:', err.message);
    return false;
  }
};

/**
 * Middleware for verifying the token in requests.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - Callback to pass control to the next middleware.
 */
const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    token = token.split(' ').pop().trim();
    const verified = verifyToken(token);
    if (verified) {
      req.user = verified;
    } else {
      console.error('Token verification failed');
    }
  }

  next();
};

module.exports = { generateToken, verifyToken, authMiddleware };
