import { sql } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  integer,
  pgEnum,
  text,
  uuid,
  index,
} from "drizzle-orm/pg-core";
import { projects } from "./projects";

// Scan status enum
export const scanStatusEnum = pgEnum("scan_status", [
  "pending",
  "in_progress",
  "completed",
  "failed",
]);

// Scan table schema
export const scans = pgTable(
  "scans",
  {
    id: uuid()
      .primaryKey()
      .notNull()
      .default(sql`gen_random_uuid()`),
    targetUrls: text().array().notNull(),

    // Scan metadata
    status: scanStatusEnum().notNull().default("pending"),
    startedAt: timestamp({ withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    completedAt: timestamp({ withTimezone: true }),

    // Scan configuration
    rateLimit: integer().notNull().default(150),
    timeout: integer().notNull().default(5),

    // Statistics
    criticalCount: integer().notNull().default(0),
    highCount: integer().notNull().default(0),
    mediumCount: integer().notNull().default(0),
    lowCount: integer().notNull().default(0),
    infoCount: integer().notNull().default(0),
    totalFindings: integer().notNull().default(0),

    // Error handling
    errorMessage: text(),
    warnings: text(),

    // Relathionships
    projectId: uuid()
      .references(() => projects.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => [
    index("scans_project_id_idx").on(table.projectId),
    index("scans_id_idx").on(table.id),
  ],
);

// Types
export type Scan = typeof scans.$inferSelect;
export type NewScan = typeof scans.$inferInsert;
