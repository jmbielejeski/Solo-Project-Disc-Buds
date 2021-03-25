
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL
);

-- Create our friends table which is a one way relationship
CREATE TABLE "friends" (
  "id" SERIAL PRIMARY KEY,
  "user_one" INT REFERENCES "user",
  "user_two" INT REFERENCES "user"
); 

-- course history table
CREATE TABLE "course_history" (
	"id" SERIAL PRIMARY KEY,
	"course_id" INT,
	"user_id" INT REFERENCES "user",
	"hole_score" INT,
	"hole_index" INT
);

-- match results table
CREATE TABLE "match_results" (
  "id" SERIAL PRIMARY KEY,
  "user_one" INT REFERENCES "user",
  "user_two" INT REFERENCES "user",
  "user_one_score" INT,
  "user_two_score" INT
);