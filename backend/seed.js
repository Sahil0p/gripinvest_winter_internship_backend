// const bcrypt = require('bcryptjs');
// const mysql = require('mysql2/promise');
// require('dotenv').config();

// async function seed() {
//   try {
//     const conn = await mysql.createConnection({
//       host: process.env.DB_HOST || 'localhost',
//       user: process.env.DB_USER || 'investuser',
//       password: process.env.DB_PASSWORD || 'investpass',
//       database: process.env.DB_NAME || 'investdb',
//       port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
//     });

//     const force = process.env.FORCE_SEED === 'true';
//     if (force) {
//       console.log('Dropping tables...');
//       await conn.query('DROP TABLE IF EXISTS investments, transaction_logs, users, investment_products, health_check');
//     }

//     await conn.query(`CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(100) NOT NULL,
//       email VARCHAR(150) UNIQUE NOT NULL,
//       password_hash VARCHAR(255) NOT NULL,
//       role ENUM('user','admin') DEFAULT 'user',
//       risk_appetite ENUM('low','moderate','high') DEFAULT 'moderate',
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )`);

//     await conn.query(`CREATE TABLE IF NOT EXISTS investment_products (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(150) NOT NULL,
//       description TEXT,
//       investment_type ENUM('bond','fd','mf','etf','other') NOT NULL,
//       risk_level ENUM('low','moderate','high') NOT NULL,
//       annual_yield DECIMAL(5,2) NOT NULL,
//       tenure_months INT NOT NULL,
//       min_investment DECIMAL(12,2) NOT NULL,
//       max_investment DECIMAL(12,2),
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )`);

//     await conn.query(`CREATE TABLE IF NOT EXISTS investments (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       user_id INT NOT NULL,
//       product_id INT NOT NULL,
//       amount DECIMAL(12,2) NOT NULL,
//       invested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
//       FOREIGN KEY (product_id) REFERENCES investment_products(id) ON DELETE CASCADE
//     )`);

//     await conn.query(`CREATE TABLE IF NOT EXISTS transaction_logs (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       user_id INT NULL,
//       user_email VARCHAR(150),
//       endpoint VARCHAR(255) NOT NULL,
//       method VARCHAR(10) NOT NULL,
//       status_code INT NOT NULL,
//       error_message TEXT,
//       timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
//     )`);

//     await conn.query(`CREATE TABLE IF NOT EXISTS health_check (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       message VARCHAR(50) DEFAULT 'OK',
//       checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )`);

//     const [rows] = await conn.query('SELECT COUNT(*) as count FROM users');
//     if (rows[0].count === 0 || force) {
//       console.log('Inserting seed data...');
//       const adminPass = await bcrypt.hash('Admin@123', 10);
//       const demoPass = await bcrypt.hash('Demo@123', 10);
//       await conn.query('INSERT INTO users (name,email,password_hash,role,risk_appetite) VALUES ?',
//         [[
//           ['Admin User','admin@invest.local',adminPass,'admin','moderate'],
//           ['Demo User','demo@invest.local',demoPass,'user','low']
//         ]]);
//       await conn.query(`INSERT INTO investment_products (name,description,investment_type,risk_level,annual_yield,tenure_months,min_investment,max_investment) VALUES ?`, [[
//         ['Government Bond','Safe long-term bond','bond','low',6.50,60,1000,100000],
//         ['Corporate FD','High yield fixed deposit','fd','moderate',8.25,12,5000,200000],
//         ['Equity Mutual Fund','High risk, high reward equity fund','mf','high',12.00,36,1000,null]
//       ]]);
//       console.log('Seed data inserted');
//     } else {
//       console.log('Existing data found, skipping insert');
//     }
//     await conn.end();
//     process.exit(0);
//   } catch (err) {
//     console.error('Seed failed', err);
//     process.exit(1);
//   }
// }

// seed();


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const InvestmentProduct = require('./models/investmentProduct.model');
// require('dotenv').config({ path: '../.env' });
// require('dotenv').config({ path: '../' });

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to DB for seeding');

    // Check if admin user exists
    let admin = await User.findOne({ email: 'admin@gripinvest.com' });
    if (!admin) {
      const passwordHash = await bcrypt.hash('AdminPass123!', 10);
      admin = new User({
        first_name: 'Admin',
        last_name: 'User',
        email: 'admin@gripinvest.com',
        password_hash: passwordHash,
        risk_appetite: 'high'
      });
      await admin.save();
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }

    // Add sample investment products
    const products = [
      {
        name: 'Safe Bond',
        investment_type: 'bond',
        tenure_months: 12,
        annual_yield: 5.5,
        risk_level: 'low',
        min_investment: 1000,
        max_investment: 50000,
        description: 'Safe Bond is a bond with 12 months tenure, offering 5.5% annual yield and low risk.'
      },
      {
        name: 'Growth Mutual Fund',
        investment_type: 'mf',
        tenure_months: 24,
        annual_yield: 8.0,
        risk_level: 'moderate',
        min_investment: 5000,
        max_investment: 100000,
        description: 'Growth Mutual Fund with 24 months tenure, 8% annual yield, moderate risk.'
      },
      {
        name: 'Aggressive ETF',
        investment_type: 'etf',
        tenure_months: 36,
        annual_yield: 12.0,
        risk_level: 'high',
        min_investment: 10000,
        max_investment: 200000,
        description: 'Aggressive ETF offering 12% annual returns for high risk tolerance over 36 months.'
      }
    ];

    for (const prod of products) {
      const exists = await InvestmentProduct.findOne({ name: prod.name });
      if (!exists) {
        const newProd = new InvestmentProduct(prod);
        await newProd.save();
        console.log(`Product created: ${prod.name}`);
      } else {
        console.log(`Product exists: ${prod.name}`);
      }
    }

    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
