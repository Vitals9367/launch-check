"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { type Project } from "@/server/db/schema/projects";
import {
  AlertTriangle,
  AlertOctagon,
  CircleOff,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
} from "lucide-react";
import { useProjectStats } from "./use-project-stats";
import { cn } from "@/lib/utils";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ProjectOverviewProps {
  project: Project;
}

const SECURITY_RATINGS = {
  A: { label: "Excellent", color: "text-green-600" },
  B: { label: "Good", color: "text-green-600" },
  C: { label: "Fair", color: "text-orange-500" },
  D: { label: "Poor", color: "text-orange-500" },
  F: { label: "Critical", color: "text-red-600" },
} as const;

function getSecurityRating(score: number): keyof typeof SECURITY_RATINGS {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-orange-500";
  return "text-red-600";
}

const RadialProgress = ({
  value,
  rating,
  ratingDetails,
}: {
  value: number;
  rating: string;
  ratingDetails: (typeof SECURITY_RATINGS)[keyof typeof SECURITY_RATINGS];
}) => {
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
        {/* Progress circle with gradient */}
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
};

// Modify the generateHistory function to include dates
function generateHistory(
  current: number,
  volatility: number = 2,
): { date: Date; value: number }[] {
  const history = Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (4 - i));
    const variation =
      Math.floor(Math.random() * volatility) - Math.floor(volatility / 2);
    return {
      date,
      value: Math.max(0, current + variation),
    };
  });
  return history.length < 2
    ? [
        { date: new Date(), value: current },
        { date: new Date(), value: current },
      ]
    : history;
}

const getColorValue = (colorClass: string): string => {
  const colors: Record<string, string> = {
    "text-red-600": "#dc2626",
    "text-orange-500": "#f97316",
    "text-yellow-500": "#eab308",
    "text-blue-500": "#3b82f6",
    "text-gray-400": "#9ca3af",
  };
  return colors[colorClass] || "#9ca3af";
};

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const { securityScore } = useProjectStats(project);
  const rating = getSecurityRating(securityScore);
  const ratingDetails = SECURITY_RATINGS[rating];

  // Mock data for demonstration
  const numericValue = parseInt(project.id.slice(-1), 16);
  const criticalIssues = numericValue % 3;
  const highIssues = (numericValue * 2) % 5;
  const mediumIssues = (numericValue * 3) % 7;
  const lowIssues = (numericValue * 2) % 4;

  // Generate historical data
  const criticalHistory = generateHistory(criticalIssues, 2);
  const highHistory = generateHistory(highIssues, 2);
  const mediumHistory = generateHistory(mediumIssues, 3);
  const lowHistory = generateHistory(lowIssues, 2);

  // Create chart data with dates
  const chartData = criticalHistory.map((item, index) => ({
    name: item.date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    critical: item.value,
    high: highHistory[index]?.value ?? 0,
    medium: mediumHistory[index]?.value ?? 0,
    low: lowHistory[index]?.value ?? 0,
  }));

  const chartConfig = {
    critical: {
      label: "Critical",
      color: "hsl(0 72% 51%)", // text-red-600
    },
    high: {
      label: "High",
      color: "hsl(24 95% 53%)", // text-orange-500
    },
    medium: {
      label: "Medium",
      color: "hsl(48 96% 53%)", // text-yellow-500
    },
    low: {
      label: "Low",
      color: "hsl(217 91% 60%)", // text-blue-500
    },
  };

  return (
    <Card className="border-2 bg-white">
      <CardHeader>
        <div className="flex flex-col space-y-6">
          <div className="grid grid-cols-3 gap-8">
            {/* Security Rating Gauge */}
            <div className="flex flex-col items-center justify-center">
              <RadialProgress
                value={securityScore}
                rating={rating}
                ratingDetails={ratingDetails}
              />
              <div className="mt-4 text-center">
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <AlertOctagon className="h-4 w-4 text-red-600" />
                    <span className="font-medium text-red-600">
                      {criticalIssues} Critical
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="font-medium text-orange-500">
                      {highIssues} High
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium text-yellow-500">
                      {mediumIssues} Medium
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleOff className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-blue-500">
                      {lowIssues} Low
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vulnerability Overview */}
            <div className="col-span-2 flex flex-col space-y-6 border-l border-gray-200 pl-8">
              <div className="space-y-6">
                <ChartContainer
                  config={chartConfig}
                  className="h-[240px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 0, right: 0, left: -10, bottom: -10 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f1f5f9"
                      />
                      <XAxis
                        dataKey="name"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        stroke="#64748b"
                        dy={0}
                        tick={{ fill: "#64748b" }}
                      />
                      <YAxis hide={true} />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        cursor={{
                          stroke: "#94a3b8",
                          strokeWidth: 1,
                          strokeDasharray: "4 4",
                        }}
                      />
                      {Object.entries(chartConfig)
                        .reverse()
                        .map(([key, config]) => (
                          <Area
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stackId="1"
                            stroke={config.color}
                            fill={config.color}
                            fillOpacity={0.1}
                            strokeWidth={2}
                            dot={{
                              r: 3,
                              strokeWidth: 2,
                              fill: "white",
                              stroke: config.color,
                            }}
                            activeDot={{
                              r: 4,
                              strokeWidth: 2,
                              fill: "white",
                              stroke: config.color,
                            }}
                          />
                        ))}
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
