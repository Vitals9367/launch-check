import {
  pgTable,
  text,
  integer,
  varchar,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

export const alerts = pgTable("alerts", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  status: varchar("status", { length: 20 }).notNull(), // release, beta, alpha
  risk: varchar("risk", { length: 20 }).notNull(), // High, Medium, Low, Informational
  type: varchar("type", { length: 50 }).notNull(), // Active, Passive, etc.
  cwe: integer("cwe"),
  wasc: integer("wasc"),
  description: text("description"),
  frameworkFixes: jsonb("framework_fixes").notNull(), // Stores fixes for different frameworks
  impactAnalysis: jsonb("impact_analysis").notNull(), // Stores comprehensive impact analysis
  mitigation: jsonb("mitigation").notNull(), // Stores quick wins and resource requirements
  priority: jsonb("priority").notNull(), // Stores priority assessment
  compliance: jsonb("compliance").notNull(), // Stores compliance implications
  monitoring: jsonb("monitoring").notNull(), // Stores monitoring guidelines
  testing: jsonb("testing").notNull(), // Stores testing approach
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Alert = typeof alerts.$inferSelect;
