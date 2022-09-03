-- schema/01_create_users.sql
DROP TABLE IF EXISTS users CASCADE;
-- CREATE USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  birthdate DATE,
  home_location VARCHAR(255),
  work_location VARCHAR(255),
  twitch_usernames VARCHAR[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
