CREATE INDEX "projects_id_idx" ON "projects" USING btree ("id");--> statement-breakpoint
CREATE INDEX "scan_findings_scan_id_idx" ON "scan_findings" USING btree ("scan_id");--> statement-breakpoint
CREATE INDEX "scan_findings_id_idx" ON "scan_findings" USING btree ("id");--> statement-breakpoint
CREATE INDEX "scans_project_id_idx" ON "scans" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "scans_id_idx" ON "scans" USING btree ("id");