const { TransactionLog } = require('../models');
const { Op } = require('sequelize');

exports.logTransaction = async (req, res) => {
  try {
    const log = await TransactionLog.create(req.body);
    res.status(201).json({ message: 'Log saved', id: log.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const { user_id, email } = req.query;
    const where = {};
    if (user_id) where.user_id = user_id;
    if (email) where.email = email;

    const logs = await TransactionLog.findAll({ where, order: [['created_at', 'DESC']] });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getErrorSummary = async (req, res) => {
  try {
    const logs = await TransactionLog.findAll({
      attributes: ['user_id', 'error_message'],
      where: { error_message: { [Op.ne]: null } },
    });

    const summary = {};
    logs.forEach(log => {
      const user = log.user_id || 'Unknown';
      const errorMsg = log.error_message;
      if (!summary[user]) summary[user] = {};
      summary[user][errorMsg] = (summary[user][errorMsg] || 0) + 1;
    });

    res.json({ summary });
  } catch (error) {
    console.error('Error aggregating logs:', error);
    res.status(500).json({ message: 'Failed to get error summary' });
  }
};
