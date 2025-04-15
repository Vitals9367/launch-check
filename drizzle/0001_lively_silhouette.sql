TRUNCATE TABLE "projects" CASCADE;
ALTER TABLE "projects" ADD COLUMN "targetUrl" text NOT NULL AFTER "name";