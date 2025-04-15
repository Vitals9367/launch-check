import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { mockFinding } from "@/server/mocks/findings";

const SeverityEnum = z.enum(["critical", "high", "medium", "low"]);
const EffortEnum = z.enum(["low", "medium", "high"]);

const TechnologySchema = z.object({
  name: z.string(),
  language: z.string(),
  vulnerableCode: z.string(),
  fixedCode: z.string(),
});

const FindingSchema = z.object({
  id: z.string(),
  name: z.string(),
  severity: SeverityEnum,
  description: z.string(),
  impact: z.string(),
  remediation: z.string(),
  effort: EffortEnum,
  location: z.string(),
  detectedAt: z.string(),
  cwe: z
    .object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
    })
    .optional(),
  technologies: z.array(TechnologySchema),
  references: z.array(
    z.object({
      title: z.string(),
      url: z.string(),
    }),
  ),
});

export type Finding = z.infer<typeof FindingSchema>;

export const findingsRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        scanId: z.string(),
        findingId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      // TODO: Replace with actual database query
      return mockFinding;
    }),
});
