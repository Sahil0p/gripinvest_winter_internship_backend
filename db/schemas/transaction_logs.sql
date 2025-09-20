CREATE TABLE IF NOT EXISTS transaction_logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id CHAR(36),
  email VARCHAR(255),
  endpoint VARCHAR(255) NOT NULL,
  http_method ENUM('GET','POST','PUT','DELETE') NOT NULL,
  status_code INT NOT NULL,
  error_message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
