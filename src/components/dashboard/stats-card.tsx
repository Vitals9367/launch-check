import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  label: string;
  value: number;
  subtext?: string;
  suffix?: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
}

export function StatsCard({
  label,
  value,
  subtext,
  suffix = "",
  icon: Icon,
  iconColor,
  iconBgColor,
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <div className="mt-1 flex items-baseline">
              <h3 className="text-2xl font-bold">
                {value}
                {suffix && <span className="ml-1 text-xl">{suffix}</span>}
              </h3>
            </div>
            {subtext && <p className="mt-1 text-sm text-gray-600">{subtext}</p>}
          </div>
          <div className={`rounded-full ${iconBgColor} p-2`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
