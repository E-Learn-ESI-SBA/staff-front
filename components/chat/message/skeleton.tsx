import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonMessage() {
  return (
    <div className="flex items-center space-x-4 ">
      <Skeleton className="h-12 w-12 rounded-full " />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
