const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

let userToken;

describe('Logs API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/gripinvest_test');
    // Create a user and login to get token
    await request(app).post('/api/auth/signup').send({
      first_name: 'Logger',
      email: 'logger@example.com',
      password: 'LogPass123!',
      risk_appetite: 'low'
    });
    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'logger@example.com',
      password: 'LogPass123!'
    });
    userToken = loginRes.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Log a transaction', async () => {
    const res = await request(app)
      .post('/api/logs')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        user_id: null,
        email: 'logger@example.com',
        endpoint: '/api/test',
        http_method: 'GET',
        status_code: 200,
        error_message: ''
      });
    expect(res.statusCode).toBe(201);
  });

  test('Get logs filtered by email', async () => {
    const res = await request(app)
      .get('/api/logs')
      .set('Authorization', `Bearer ${userToken}`)
      .query({ email: 'logger@example.com' });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
