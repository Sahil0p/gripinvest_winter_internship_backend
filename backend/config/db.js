// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME || 'investdb',
//   process.env.DB_USER || 'investuser',
//   process.env.DB_PASSWORD || 'investpass',
//   {
//     host: process.env.DB_HOST || 'localhost',
//     port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
//     dialect: 'mysql',
//     logging: false, // set true if you want SQL logs
//   }
// );

// module.exports = sequelize;


const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'investdb',
  process.env.DB_USER || 'investuser',
  process.env.DB_PASSWORD || 'investpass',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;
