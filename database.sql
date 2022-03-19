
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin" boolean default false
);

CREATE TABLE "recommended_trees" (
	"id" SERIAL PRIMARY KEY,
	"species" VARCHAR (1000) NOT NULL,
	"height" integer,
	"width" integer,
	"fall_color" VARCHAR (1000),
	"shade_tolerance" VARCHAR (1000),
	"other_notes" VARCHAR (2000),
	"img_url" VARCHAR (2000),
	"region" VARCHAR (1000),
	"deciduous" boolean default true
);

CREATE TABLE "favorites" (
	"id" SERIAL PRIMARY KEY,
	"user_id" int REFERENCES "user",
	"tree_id" int REFERENCES "recommended_trees"   
);