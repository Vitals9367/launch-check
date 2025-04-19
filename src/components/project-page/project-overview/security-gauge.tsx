import { SECURITY_RATINGS } from "./constants";
import { RadialProgress } from "./radial-progress";
import { SeverityList } from "./severity-list";

interface SecurityGaugeProps {
  score: number;
  rating: "A" | "B" | "C" | "D" | "F";
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export function SecurityGauge({
  score,
  rating,
  vulnerabilities,
}: SecurityGaugeProps) {
  const ratingDetails = SECURITY_RATINGS[rating];

  return (
    <div className="flex flex-col items-center justify-center">
      <RadialProgress
        value={score}
        rating={rating}
        ratingDetails={ratingDetails}
      />
      <div className="mt-4 text-center">
        <SeverityList vulnerabilities={vulnerabilities} />
      </div>
    </div>
  );
}
