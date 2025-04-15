import type { ProjectStats } from "@/server/routers/projects";
import { SECURITY_RATINGS } from "./constants";
import { RadialProgress } from "./radial-progress";
import { SeverityList } from "./severity-list";

interface SecurityGaugeProps {
  stats: ProjectStats;
}

export function SecurityGauge({ stats }: SecurityGaugeProps) {
  const ratingDetails = SECURITY_RATINGS[stats.rating];

  return (
    <div className="flex flex-col items-center justify-center">
      <RadialProgress
        value={stats.securityScore}
        rating={stats.rating}
        ratingDetails={ratingDetails}
      />
      <div className="mt-4 text-center">
        <SeverityList vulnerabilities={stats.vulnerabilities} />
      </div>
    </div>
  );
}
