import { sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  pgEnum,
  text,
  boolean,
  jsonb,
  uuid,
  index,
} from "drizzle-orm/pg-core";
import { scans } from "./scan";

// Severity level enum
export const severityLevelEnum = pgEnum("severity_level", [
  "critical",
  "high",
  "medium",
  "low",
  "info",
]);

// Scan findings table schema
export const scanFindings = pgTable(
  "scan_findings",
  {
    id: uuid()
      .primaryKey()
      .notNull()
      .default(sql`gen_random_uuid()`),

    scanId: uuid()
      .references(() => scans.id, { onDelete: "cascade" })
      .notNull(),

    // Finding details
    title: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
    severity: severityLevelEnum().notNull(),

    // Technical details
    location: varchar({ length: 2048 }), // URL, file path, or endpoint
    snippet: text(), // Code snippet or relevant context
    recommendation: text(), // How to fix

    // Additional metadata
    createdAt: timestamp({ withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("scan_findings_scan_id_idx").on(table.scanId),
    index("scan_findings_id_idx").on(table.id),
  ],
);

// Types
export type ScanFinding = typeof scanFindings.$inferSelect;
export type NewScanFinding = typeof scanFindings.$inferInsert;
