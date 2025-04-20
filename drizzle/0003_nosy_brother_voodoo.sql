CREATE TABLE "finding_classifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cve_id" varchar(50),
	"cwe_ids" text[]
);
--> statement-breakpoint
CREATE TABLE "finding_info" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"authors" text[] NOT NULL,
	"tags" text[] NOT NULL,
	"description" text NOT NULL,
	"severity" "severity_level" NOT NULL,
	"metadata" jsonb,
	"classification_id" uuid
);
--> statement-breakpoint
DROP INDEX "scan_findings_scan_id_idx";--> statement-breakpoint
DROP INDEX "scan_findings_id_idx";--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "template" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "template_url" varchar(2048) NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "template_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "template_path" varchar(2048) NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "info_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "matcher_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "type" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "host" varchar(2048) NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "matched_at" varchar(2048) NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "request" text NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "matcher_status" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "finding_info" ADD CONSTRAINT "finding_info_classification_id_finding_classifications_id_fk" FOREIGN KEY ("classification_id") REFERENCES "public"."finding_classifications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD CONSTRAINT "scan_findings_info_id_finding_info_id_fk" FOREIGN KEY ("info_id") REFERENCES "public"."finding_info"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scan_findings" DROP COLUMN "title";--> statement-breakpoint
ALTER TABLE "scan_findings" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "scan_findings" DROP COLUMN "severity";--> statement-breakpoint
ALTER TABLE "scan_findings" DROP COLUMN "location";--> statement-breakpoint
ALTER TABLE "scan_findings" DROP COLUMN "snippet";--> statement-breakpoint
ALTER TABLE "scan_findings" DROP COLUMN "recommendation";