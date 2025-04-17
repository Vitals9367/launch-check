interface ScanDurationProps {
  startedAt: Date | string;
  completedAt?: Date | string | null;
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  let duration = "";

  if (minutes < 1) {
    duration = "< 1m";
  } else {
    duration = `${minutes}m`;
  }

  return `Duration: ${duration}`;
}

export function ScanDuration({ startedAt, completedAt }: ScanDurationProps) {
  const duration = completedAt
    ? formatDuration(
        new Date(completedAt).getTime() - new Date(startedAt).getTime(),
      )
    : "Running...";

  return <p className="text-sm text-gray-500">{duration}</p>;
}
