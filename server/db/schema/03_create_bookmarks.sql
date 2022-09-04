-- schema/02_create_urls.sql
DROP TABLE IF EXISTS bookmarks CASCADE;
-- CREATE URLS
CREATE TABLE bookmarks (
  "id" SERIAL PRIMARY KEY,
  "user_category_id" integer REFERENCES users_categories(id) ON DELETE CASCADE NOT NULL,
  "bookmark_title" VARCHAR(255) NOT NULL,
  "bookmark_url" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);