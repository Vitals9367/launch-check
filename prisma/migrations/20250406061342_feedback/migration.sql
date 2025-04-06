-- CreateTable
CREATE TABLE "feedback" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "feedback_email_idx" ON "feedback"("email");

-- CreateIndex
CREATE UNIQUE INDEX "feedback_email_key" ON "feedback"("email");
