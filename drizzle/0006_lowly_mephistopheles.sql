CREATE TABLE "alerts" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"status" varchar(20) NOT NULL,
	"risk" varchar(20) NOT NULL,
	"type" varchar(50) NOT NULL,
	"cwe" integer,
	"wasc" integer,
	"description" text,
	"framework_fixes" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
