import { useMemo } from "react";
import type { Project } from "@/server/db/schema/projects";

export type ProjectStatus = "secure" | "warning" | "vulnerable";

interface ProjectStats {
  status: ProjectStatus;
  domain: string | null;
  environment: string;
  securityScore: number;
}

export function useProjectStats(project: Project) {
  const stats = useMemo((): ProjectStats => {
    // Use project ID to generate consistent mock data
    const lastChar = project.id.slice(-1);
    const numericValue = parseInt(lastChar, 16);

    // Generate mock security score (0-100)
    const securityScore = Math.max(0, Math.min(100, (numericValue * 7) % 100));

    // Determine status based on security score
    const status: ProjectStatus =
      securityScore > 80
        ? "secure"
        : securityScore > 50
          ? "warning"
          : "vulnerable";

    // Mock domain based on project name
    const domain = project.name.toLowerCase().replace(/\s+/g, "-") + ".com";

    // Mock environment (alternate between Production and Staging)
    const environment = numericValue % 2 === 0 ? "Production" : "Staging";

    return {
      status,
      domain,
      environment,
      securityScore,
    };
  }, [project.id, project.name]);

  return stats;
}
