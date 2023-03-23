CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE refreshTokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userPrimaryKeyId INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (userPrimaryKeyId) REFERENCES users(id) ON DELETE CASCADE
);

