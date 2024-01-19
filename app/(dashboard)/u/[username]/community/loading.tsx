import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="p-6">
      <Skeleton className="h-10 w-[300px] my-3" />

      <Skeleton className="rounded-xl h-12 w-[400px] mb-3" />
      <Skeleton className="rounded-xl p-20 w-full" />
    </div>
  );
};

export default loading;
