CREATE TABLE IF NOT EXISTS investment_products (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(255) NOT NULL,
  investment_type ENUM('bond','fd','mf','etf','other') NOT NULL,
  tenure_months INT NOT NULL,
  annual_yield DECIMAL(5,2) NOT NULL,
  risk_level ENUM('low','moderate','high') NOT NULL,
  min_investment DECIMAL(12,2) DEFAULT 1000.00,
  max_investment DECIMAL(12,2),
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
