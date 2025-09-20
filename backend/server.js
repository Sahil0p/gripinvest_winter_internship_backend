const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const investmentsRoutes = require('./routes/investments.routes');
const logsRoutes = require('./routes/logs.routes');
const healthRoutes = require('./routes/health.routes');

const loggingMiddleware = require('./middleware/logging.middleware');
const errorHandler = require('./middleware/error.middleware');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB and sync models
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');

    await sequelize.sync({ alter: true }); // creates tables if not exist or updates them
    console.log('Models synchronized');

  } catch (error) {
    console.error('Database connection/sync failed:', error);
    process.exit(1);
  }
})();

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/investments', investmentsRoutes);
app.use('/api/logs', logsRoutes);
app.use('/api', healthRoutes);

// Logging middleware (should come after routes to catch response data)
app.use(loggingMiddleware);

// Central error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port: ${PORT}`);
});

module.exports = app;
