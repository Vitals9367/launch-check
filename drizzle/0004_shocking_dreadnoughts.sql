CREATE TYPE "public"."confidence_level" AS ENUM('high', 'medium', 'low', 'confirmed');--> statement-breakpoint
CREATE TYPE "public"."risk_level" AS ENUM('high', 'medium', 'low', 'info');--> statement-breakpoint
DROP TABLE "finding_classifications" CASCADE;--> statement-breakpoint
DROP TABLE "finding_info" CASCADE;--> statement-breakpoint
--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "severity" "severity_level" NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "confidence" "confidence_level" NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "solution" text;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "reference" text;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "tags" text[];--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "risk_level" "risk_level" NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "risk_score" integer;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "plugin_id" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "cve_id" varchar(50);--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "cwe_ids" text[];--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "wasc" text[];--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "url" varchar(2048) NOT NULL;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "method" varchar(10);--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "parameter" varchar(255);--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "attack" text;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "evidence" text;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "other_info" text;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "request_headers" jsonb;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "request_body" text;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "response_headers" jsonb;--> statement-breakpoint
ALTER TABLE "scan_findings" ADD COLUMN "metadata" jsonb;--> statement-breakpoint
ALTER TABLE "scan_findings" DROP COLUMN "template";--> statement-breakpoint
ALTER TABLE "scan_findings" DROP COLUMN "template_url";--> statement-breakpoint
ALTER TABLE "scan_findings" DROP COLUMN "template_id";--> statement-breakpoint
ALTER TABLE "scan_findings" DROP COLUMN "template_path";--> statement-breakpoint
ALTER TABLE "scan_findings" DROP COLUMN "info_id";--> statement-breakpoint
ALTER TABLE "scan_findings" DROP COLUMN "matcher_name";--> statement-breakpoint
ALTER TABLE "scan_findings" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "scan_findings" DROP COLUMN "host";--> statement-breakpoint
ALTER TABLE "scan_findings" DROP COLUMN "matched_at";--> statement-breakpoint
ALTER TABLE "scan_findings" DROP COLUMN "request";--> statement-breakpoint
ALTER TABLE "scan_findings" DROP COLUMN "matcher_status";