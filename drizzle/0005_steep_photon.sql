ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "max_scans" integer DEFAULT 5 NOT NULL;