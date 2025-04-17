interface ScanDurationProps {
  startedAt: Date | string;
  completedAt?: Date | string | null;
}

export function ScanDuration({ startedAt, completedAt }: ScanDurationProps) {
  const duration = completedAt
    ? formatDuration(
        new Date(completedAt).getTime() - new Date(startedAt).getTime(),
      )
    : "Running...";

  return <p className="text-sm text-gray-500">Duration: {duration}</p>;
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  if (minutes < 1) return "< 1m";
  return `${minutes}m`;
}
