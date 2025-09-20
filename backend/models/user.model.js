const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: {
          type: DataTypes.STRING,
          unique: true,
        },
        password_hash: DataTypes.STRING,
        risk_appetite: DataTypes.ENUM('low', 'moderate', 'high'),
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
      }
    );
  }
}

module.exports = User;
