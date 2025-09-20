// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const InvestmentProduct = sequelize.define('InvestmentProduct', {
//   id: { type: DataTypes.CHAR(36), primaryKey: true, defaultValue: DataTypes.UUIDV4 },
//   name: { type: DataTypes.STRING(255), allowNull: false },
//   investment_type: { type: DataTypes.ENUM('bond','fd','mf','etf','other'), allowNull: false },
//   tenure_months: { type: DataTypes.INTEGER, allowNull: false },
//   annual_yield: { type: DataTypes.DECIMAL(5,2), allowNull: false },
//   risk_level: { type: DataTypes.ENUM('low','moderate','high'), allowNull: false },
//   min_investment: { type: DataTypes.DECIMAL(12,2), allowNull: false, defaultValue: 1000.00 },
//   max_investment: { type: DataTypes.DECIMAL(12,2), allowNull: true },
//   description: { type: DataTypes.TEXT, allowNull: true },
//   created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
//   updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
// }, {
//   timestamps: true,
//   createdAt: 'created_at',
//   updatedAt: 'updated_at',
//   tableName: 'investment_products'
// });

// module.exports = InvestmentProduct;
const { Model, DataTypes } = require('sequelize');

class InvestmentProduct extends Model {
  static initModel(sequelize) {
    InvestmentProduct.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: DataTypes.STRING,
        investment_type: DataTypes.ENUM('bond', 'fd', 'mf', 'etf', 'other'),
        tenure_months: DataTypes.INTEGER,
        annual_yield: DataTypes.DECIMAL(5, 2),
        risk_level: DataTypes.ENUM('low', 'moderate', 'high'),
        min_investment: {
          type: DataTypes.DECIMAL(12, 2),
          defaultValue: 1000.0,
        },
        max_investment: DataTypes.DECIMAL(12, 2),
        description: DataTypes.TEXT,
      },
      {
        sequelize,
        modelName: 'InvestmentProduct',
        tableName: 'investment_products',
        timestamps: true,
      }
    );
  }
}

module.exports = InvestmentProduct;
