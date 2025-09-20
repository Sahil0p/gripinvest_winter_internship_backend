const sequelize = require('../config/db');
const User = require('./user.model');
const InvestmentProduct = require('./investmentProduct.model');
const Investment = require('./investment.model');
const TransactionLog = require('./transactionLog.model');

// Init models with sequelize instance
User.initModel(sequelize);
InvestmentProduct.initModel(sequelize);
Investment.initModel(sequelize);
TransactionLog.initModel(sequelize);

// Define associations
User.hasMany(Investment, { foreignKey: 'user_id' });
Investment.belongsTo(User, { foreignKey: 'user_id' });

InvestmentProduct.hasMany(Investment, { foreignKey: 'product_id' });
Investment.belongsTo(InvestmentProduct, { foreignKey: 'product_id' });

User.hasMany(TransactionLog, { foreignKey: 'user_id' });
TransactionLog.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  InvestmentProduct,
  Investment,
  TransactionLog,
};
