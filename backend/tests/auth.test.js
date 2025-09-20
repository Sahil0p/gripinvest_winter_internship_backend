const request = require('supertest');
const app = require('../server'); // Modify server.js to export app for testing
const mongoose = require('mongoose');
const User = require('../models/user.model');

describe('Auth API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/gripinvest_test');
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Signup creates a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'Str0ngPass!',
        risk_appetite: 'moderate'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/User signed up successfully/i);
  });

  test('Signup rejects weak password', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      first_name: 'Jane',
      email: 'jane@example.com',
      password: 'weak',
      risk_appetite: 'low'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Password is weak/i);
  });

  test('Login with correct credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'john@example.com',
      password: 'Str0ngPass!'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('Login with wrong credentials is rejected', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'john@example.com',
      password: 'wrongpass'
    });
    expect(res.statusCode).toBe(401);
  });
});
