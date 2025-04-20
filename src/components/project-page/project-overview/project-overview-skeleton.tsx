import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectOverviewSkeleton() {
  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex flex-col space-y-6">
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col items-center justify-center">
              <Skeleton className="h-40 w-40 rounded-full" />
              <div className="mt-4 grid w-full grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
            </div>
            <div className="col-span-2 flex flex-col space-y-6 border-l border-gray-200 pl-8">
              <Skeleton className="h-[240px] w-full" />
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
