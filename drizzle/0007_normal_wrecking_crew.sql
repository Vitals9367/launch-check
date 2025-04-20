ALTER TABLE "alerts" ADD COLUMN "impact_analysis" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "alerts" ADD COLUMN "mitigation" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "alerts" ADD COLUMN "priority" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "alerts" ADD COLUMN "compliance" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "alerts" ADD COLUMN "monitoring" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "alerts" ADD COLUMN "testing" jsonb NOT NULL;