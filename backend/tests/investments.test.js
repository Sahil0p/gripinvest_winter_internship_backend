const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const InvestmentProduct = require('../models/investmentProduct.model');

let userToken, productId;

describe('Investments API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/gripinvest_test');
    await User.deleteMany({});
    await InvestmentProduct.deleteMany({});

    await request(app).post('/api/auth/signup').send({
      first_name: 'Investor',
      email: 'investor@example.com',
      password: 'StrongPass1!',
      risk_appetite: 'moderate'
    });

    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'investor@example.com',
      password: 'StrongPass1!'
    });
    userToken = loginRes.body.token;

    const productRes = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${userToken}`) // For test, assume user is admin or adjust accordingly
      .send({
        name: 'Test FD',
        investment_type: 'fd',
        tenure_months: 6,
        annual_yield: 6.0,
        risk_level: 'moderate',
        min_investment: 1000,
        max_investment: 50000
      });

    productId = productRes.body._id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Invest in product', async () => {
    const res = await request(app)
      .post('/api/investments')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        product_id: productId,
        amount: 2000
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.amount).toBe(2000);
    expect(res.body.expected_return).toBeDefined();
  });

  test('Get portfolio', async () => {
    const res = await request(app)
      .get('/api/investments/portfolio')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.investments)).toBe(true);
  });
});
