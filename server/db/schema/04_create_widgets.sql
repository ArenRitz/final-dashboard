DROP TABLE IF EXISTS widgets CASCADE;

CREATE TABLE "widgets" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "visibility" boolean NOT NULL,
  "credential_1" VARCHAR(255) DEFAULT null,
  "credential_2" VARCHAR(255) DEFAULT null,
  "credential_3" VARCHAR(255) DEFAULT null,
  "created_at" timestamp DEFAULT (NOW()),
  "updated_at" timestamp DEFAULT (NOW())
);
