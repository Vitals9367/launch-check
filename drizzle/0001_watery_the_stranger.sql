ALTER TABLE "waitlist_entries" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "feedback" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();