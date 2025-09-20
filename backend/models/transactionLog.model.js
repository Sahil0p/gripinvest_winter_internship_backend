// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
// const User = require('./user.model');

// const TransactionLog = sequelize.define('TransactionLog', {
//   id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
//   user_id: { type: DataTypes.CHAR(36), allowNull: true, references: { model: User, key: 'id' } },
//   email: { type: DataTypes.STRING(255), allowNull: true },
//   endpoint: { type: DataTypes.STRING(255), allowNull: false },
//   http_method: { type: DataTypes.ENUM('GET','POST','PUT','DELETE'), allowNull: false },
//   status_code: { type: DataTypes.INTEGER, allowNull: false },
//   error_message: { type: DataTypes.TEXT, allowNull: true },
//   created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
// }, {
//   timestamps: false,
//   tableName: 'transaction_logs'
// });

// User.hasMany(TransactionLog, { foreignKey: 'user_id' });
// TransactionLog.belongsTo(User, { foreignKey: 'user_id' });

// module.exports = TransactionLog;
const { Model, DataTypes } = require('sequelize');

class TransactionLog extends Model {
  static initModel(sequelize) {
    TransactionLog.init(
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: DataTypes.UUID,
        email: DataTypes.STRING,
        endpoint: DataTypes.STRING,
        http_method: DataTypes.ENUM('GET', 'POST', 'PUT', 'DELETE'),
        status_code: DataTypes.INTEGER,
        error_message: DataTypes.TEXT,
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'TransactionLog',
        tableName: 'transaction_logs',
        timestamps: false,
      }
    );
  }
}

module.exports = TransactionLog;
