import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Project } from "@/server/db/schema/projects";
import { Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface ProjectOverviewProps {
  project: Project;
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const stats = [
    {
      title: "Security Score",
      value: "85%",
      icon: Shield,
      description: "Overall security rating",
      color: "text-green-600",
    },
    {
      title: "Critical Issues",
      value: "2",
      icon: AlertTriangle,
      description: "High priority vulnerabilities",
      color: "text-red-600",
    },
    {
      title: "Resolved",
      value: "45",
      icon: CheckCircle,
      description: "Fixed vulnerabilities",
      color: "text-blue-600",
    },
    {
      title: "Last Scan",
      value: "2d ago",
      icon: Clock,
      description: "Most recent security scan",
      color: "text-gray-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-gray-500">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
