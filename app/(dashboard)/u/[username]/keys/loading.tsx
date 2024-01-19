import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="p-6">
      <Skeleton className="h-10 w-[200px] my-3" />

      <Skeleton className="rounded-xl p-10 w-full mb-3" />
      <Skeleton className="rounded-xl p-10 w-full" />
    </div>
  );
};

export default loading;
