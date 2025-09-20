const TransactionLog = require('../models/transactionLog.model');

const loggingMiddleware = async (req, res, next) => {
  // Capture response status and error message if any
  const oldSend = res.send;
  res.send = async function (data) {
    try {
      const error_message = res.statusCode >= 400 ? data.toString() : null;
      await TransactionLog.create({
        user_id: req.user?.id,
        email: req.user?.email,
        endpoint: req.originalUrl,
        http_method: req.method,
        status_code: res.statusCode,
        error_message
      });
    } catch (err) {
      console.error('Failed to log transaction:', err);
    }
    oldSend.apply(res, arguments);
  };
  next();
};

module.exports = loggingMiddleware;
