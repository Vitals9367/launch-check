import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("user", {
  id: uuid()
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  name: text(),
  email: text().unique(),
  emailVerified: timestamp({ mode: "date" }),
  image: text(),
  maxScans: integer("max_scans").notNull().default(10),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
