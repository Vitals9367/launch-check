ALTER TABLE "scanFindings" RENAME TO "scan_findings";--> statement-breakpoint
ALTER TABLE "verificationToken" RENAME TO "verification_token";--> statement-breakpoint
ALTER TABLE "scan_findings" DROP CONSTRAINT "scanFindings_scan_id_scans_id_fk";
--> statement-breakpoint
ALTER TABLE "scan_findings" ADD CONSTRAINT "scan_findings_scan_id_scans_id_fk" FOREIGN KEY ("scan_id") REFERENCES "public"."scans"("id") ON DELETE cascade ON UPDATE no action;