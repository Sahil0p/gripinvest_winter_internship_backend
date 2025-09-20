CREATE TABLE IF NOT EXISTS investments (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id CHAR(36) NOT NULL,
  product_id CHAR(36) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  invested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('active','matured','cancelled') DEFAULT 'active',
  expected_return DECIMAL(12,2),
  maturity_date DATE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES investment_products(id) ON DELETE CASCADE
);
