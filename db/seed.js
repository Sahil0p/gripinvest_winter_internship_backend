const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../backend/config/db'); // adjust path if needed
const User = require('../backend/models/user.model');
const InvestmentProduct = require('../backend/models/investmentProduct.model');

async function seed() {
  try {
    await sequelize.sync({ force: true }); // Drops and recreates tables

    const passwordHash = await bcrypt.hash('Password123!', 10);

    // Seed users
    await User.bulkCreate([
      {
        id: uuidv4(),
        first_name: 'Alice',
        last_name: 'Wonder',
        email: 'alice@example.com',
        password_hash: passwordHash,
        risk_appetite: 'moderate',
      },
      {
        id: uuidv4(),
        first_name: 'Bob',
        last_name: 'Builder',
        email: 'bob@example.com',
        password_hash: passwordHash,
        risk_appetite: 'high',
      },
    ]);

    // Seed investment products
    await InvestmentProduct.bulkCreate([
      {
        id: uuidv4(),
        name: 'Super Safe Bond',
        investment_type: 'bond',
        tenure_months: 12,
        annual_yield: 5.0,
        risk_level: 'low',
        min_investment: 1000,
        max_investment: 50000,
        description: 'A secure bond with low risk and steady returns.',
      },
      {
        id: uuidv4(),
        name: 'Growth Mutual Fund',
        investment_type: 'mf',
        tenure_months: 36,
        annual_yield: 12.0,
        risk_level: 'high',
        min_investment: 2000,
        max_investment: 100000,
        description: 'High growth mutual fund for high risk appetite.',
      },
    ]);

    console.log('Database seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed DB:', err);
    process.exit(1);
  }
}

seed();
