import { pgTable, text, timestamp, uuid, index } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { projects } from "./projects";

export const links = pgTable(
  "links",
  {
    id: uuid()
      .primaryKey()
      .notNull()
      .default(sql`gen_random_uuid()`),
    url: text().notNull(),
    projectId: uuid()
      .notNull()
      .references(() => projects.id),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [index("links_project_id_idx").on(table.projectId)],
);

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
