// const jwt = require('jsonwebtoken');
// const jwtConfig = require('../config/jwt');

// exports.verifyJWT = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Missing token' });

//   jwt.verify(token, jwtConfig.secret, (err, decoded) => {
//     if (err) return res.status(401).json({ message: 'Invalid token' });
//     req.user = decoded;
//     next();
//   });
// };

// // Example admin verifier; assumes user email "admin@gripinvest.com" is admin for demo
// exports.verifyAdmin = (req, res, next) => {
//   exports.verifyJWT(req, res, () => {
//     const adminEmails = ['admin@gripinvest.com'];
//     if (adminEmails.includes(req.user.email)) return next();
//     return res.status(403).json({ message: 'Admin only' });
//   });
// };
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

exports.verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Missing authorization header' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// Example simple admin check - your real admin verification may differ
exports.verifyAdmin = (req, res, next) => {
  exports.verifyJWT(req, res, () => {
    const adminEmails = ['admin@gripinvest.com'];
    if (adminEmails.includes(req.user.email)) {
      next();
    } else {
      res.status(403).json({ message: 'Admin only access allowed' });
    }
  });
};
