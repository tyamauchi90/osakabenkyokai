import { Card } from "../shadcn/ui/card";
import { Skeleton } from "../shadcn/ui/skeleton";

export function LoadingSkelton() {
  return (
    <Card className="p-10">
      <div className="flex items-center space-x-4 w-full">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-3/4" />
        </div>
      </div>
    </Card>
  );
}
