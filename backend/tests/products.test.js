const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const InvestmentProduct = require('../models/investmentProduct.model');

let adminToken;

describe('Products API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/gripinvest_test');
    await InvestmentProduct.deleteMany({});

    // Create admin token for testing
    const response = await request(app).post('/api/auth/login').send({
      email: 'admin@gripinvest.com',
      password: 'AdminPass123!'
    });
    adminToken = response.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Create product as admin', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Test Bond',
        investment_type: 'bond',
        tenure_months: 12,
        annual_yield: 5.5,
        risk_level: 'low',
        min_investment: 1000,
        max_investment: 100000
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Bond');
  });

  test('Get product list', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
