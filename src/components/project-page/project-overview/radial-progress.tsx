import { cn } from "@/lib/utils";
import { SECURITY_RATINGS } from "./constants";

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-orange-500";
  return "text-red-600";
}

interface RadialProgressProps {
  value: number;
  rating: string;
  ratingDetails: (typeof SECURITY_RATINGS)[keyof typeof SECURITY_RATINGS];
}

export function RadialProgress({
  value,
  rating,
  ratingDetails,
}: RadialProgressProps) {
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const scoreColor = getScoreColor(value);

  return (
    <div className="group relative">
      <svg height={size} width={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          className="text-gray-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className={cn(scoreColor, "transition-all duration-500 ease-in-out")}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className={cn("text-5xl font-bold", ratingDetails.color)}>
          {rating}
        </span>
        <span className={cn("mt-1 text-lg font-medium", scoreColor)}>
          {value}%
        </span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/5 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="rounded-lg bg-white/95 p-2 text-sm shadow-lg">
          <p className="font-medium">Security Score</p>
          <p className={cn("font-semibold", ratingDetails.color)}>
            {ratingDetails.label}
          </p>
        </div>
      </div>
    </div>
  );
}
