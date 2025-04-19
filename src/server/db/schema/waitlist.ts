import {
  pgTable,
  text,
  timestamp,
  uuid,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const waitlistEntry = pgTable(
  "waitlist_entries",
  {
    name: text().notNull(),
    email: text().notNull(),
    joinedAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    id: uuid()
      .primaryKey()
      .notNull()
      .default(sql`gen_random_uuid()`),
  },
  (table) => [
    index("waitlist_entries_email_idx").using(
      "btree",
      table.email.asc().nullsLast().op("text_ops"),
    ),
    uniqueIndex("waitlist_entries_email_key").using(
      "btree",
      table.email.asc().nullsLast().op("text_ops"),
    ),
  ],
);
