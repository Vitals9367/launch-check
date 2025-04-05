/*
  Warnings:

  - The primary key for the `waitlist_entries` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `waitlist_entries` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "waitlist_entries" DROP CONSTRAINT "waitlist_entries_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "waitlist_entries_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "waitlist_entries_email_idx" ON "waitlist_entries"("email");
