import { db } from "@/server/db/db";
import { projects } from "@/server/db/schema/projects";
import { scans } from "@/server/db/schema/scan";
import { scanFindings } from "@/server/db/schema/scan-finding";
import { users } from "@/server/db/schema/users";
import { and, eq } from "drizzle-orm";

export interface ProjectWithOwner {
  project: {
    id: string;
    name: string;
    targetUrl: string;
    userId: string;
  };
  owner: {
    email: string | null;
  } | null;
}

export interface ScanResult {
  scan: typeof scans.$inferSelect;
}

export async function getProjectWithOwner(
  projectId: string,
): Promise<ProjectWithOwner | null> {
  const [result] = await db
    .select({
      project: {
        id: projects.id,
        name: projects.name,
        targetUrl: projects.targetUrl,
        userId: projects.userId,
      },
      owner: {
        email: users.email,
      },
    })
    .from(projects)
    .where(eq(projects.id, projectId))
    .leftJoin(users, eq(users.id, projects.userId))
    .execute();

  return result || null;
}

export async function getScanForProject(
  scanId: string,
  projectId: string,
): Promise<ScanResult | null> {
  const [result] = await db
    .select({
      scan: scans,
    })
    .from(scans)
    .where(and(eq(scans.id, scanId), eq(scans.projectId, projectId)))
    .execute();

  return result || null;
}

export async function getScanFindings(scanId: string) {
  return db
    .select()
    .from(scanFindings)
    .where(eq(scanFindings.scanId, scanId))
    .execute();
}
