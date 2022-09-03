-- schema/02_create_urls.sql
DROP TABLE IF EXISTS users_categories CASCADE;
-- CREATE URLS
CREATE TABLE users_categories (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  category_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);