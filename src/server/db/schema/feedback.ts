import { pgTable, text, timestamp, uuid, index } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const feedback = pgTable(
  "feedback",
  {
    id: uuid()
      .primaryKey()
      .notNull()
      .default(sql`gen_random_uuid()`),
    name: text().notNull(),
    email: text().notNull(),
    feedback: text().notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("feedback_email_idx").using(
      "btree",
      table.email.asc().nullsLast().op("text_ops"),
    ),
  ],
);
