DROP SCHEMA public CASCADE;
CREATE SCHEMA public
DROP DATABASE IF EXISTS foodfy;
CREATE DATABASE foodfy;

-- create chefs
CREATE TABLE "chefs" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "file_id" INT NOT NULL,
    "created_at" timestamp DEFAULT (NOW())  ,
    "updated_at" timestamp DEFAULT (NOW())
);

-- create receipts
CREATE TABLE "receipts" (
    "id" SERIAL PRIMARY KEY,
    "chef_id" INT NOT NULL,
    "user_id" INT NOT NULL,
    "title" TEXT NOT NULL,
    "ingredients" text[],
    "preparation" text[],
    "information" text,
    "created_at" timestamp DEFAULT (NOW()),
    "updated_at" timestamp DEFAULT (NOW())  
);

-- create receipts
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "reset_token" TEXT,
    "reset_token_expires" TEXT,
    "is_admin" BOOLEAN DEFAULT false,
    "created_at" timestamp DEFAULT (NOW()),
    "updated_at" timestamp DEFAULT (NOW())  
);

-- create files
CREATE TABLE "files" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL 
);

-- create recipe_files
CREATE TABLE "recipe_files" (
    "id" SERIAL PRIMARY KEY,
    "recipe_id" INT NOT NULL,
    "file_id" INT NOT NULL
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" 
ADD CONSTRAINT "session_pkey" 
PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "chefs" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");
ALTER TABLE "receipts" ADD FOREIGN KEY ("chef_id")  REFERENCES "chefs" ("id");
ALTER TABLE "receipts" ADD FOREIGN KEY ("user_id")  REFERENCES "users" ("id");
ALTER TABLE "recipe_files" ADD FOREIGN KEY ("recipe_id")  REFERENCES "receipts" ("id");
ALTER TABLE "recipe_files" ADD FOREIGN KEY ("file_id")  REFERENCES "files" ("id");


ALTER TABLE recipe_files
DROP CONSTRAINT recipe_files_recipe_id_fkey,
add CONSTRAINT recipe_files_recipe_id_fkey
FOREIGN KEY (recipe_id)
REFERENCES receipts(id)
ON DELETE CASCADE;

ALTER TABLE recipe_files
DROP CONSTRAINT recipe_files_file_id_fkey,
add CONSTRAINT recipe_files_file_id_fkey
FOREIGN KEY (file_id)
REFERENCES files(id)
ON DELETE CASCADE;

-- create procedure
CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- auto updated_at products
CREATE TRIGGER trigger_set_timestamp
BEFORE UPDATE ON receipts
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();