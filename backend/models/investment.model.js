// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
// const User = require('./user.model');
// const InvestmentProduct = require('./investmentProduct.model');

// const Investment = sequelize.define('Investment', {
//   id: { type: DataTypes.CHAR(36), primaryKey: true, defaultValue: DataTypes.UUIDV4 },
//   user_id: { type: DataTypes.CHAR(36), allowNull: false, references: { model: User, key: 'id' } },
//   product_id: { type: DataTypes.CHAR(36), allowNull: false, references: { model: InvestmentProduct, key: 'id' } },
//   amount: { type: DataTypes.DECIMAL(12,2), allowNull: false },
//   invested_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
//   status: { type: DataTypes.ENUM('active','matured','cancelled'), defaultValue: 'active' },
//   expected_return: { type: DataTypes.DECIMAL(12,2), allowNull: true },
//   maturity_date: { type: DataTypes.DATE, allowNull: true }
// }, {
//   timestamps: false,
//   tableName: 'investments'
// });

// User.hasMany(Investment, { foreignKey: 'user_id' });
// Investment.belongsTo(User, { foreignKey: 'user_id' });
// InvestmentProduct.hasMany(Investment, { foreignKey: 'product_id' });
// Investment.belongsTo(InvestmentProduct, { foreignKey: 'product_id' });

// module.exports = Investment;
const { Model, DataTypes } = require('sequelize');

class Investment extends Model {
  static initModel(sequelize) {
    Investment.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        product_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        amount: DataTypes.DECIMAL(12, 2),
        invested_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        status: {
          type: DataTypes.ENUM('active', 'matured', 'cancelled'),
          defaultValue: 'active',
        },
        expected_return: DataTypes.DECIMAL(12, 2),
        maturity_date: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'Investment',
        tableName: 'investments',
        timestamps: true,
      }
    );
  }
}

module.exports = Investment;
