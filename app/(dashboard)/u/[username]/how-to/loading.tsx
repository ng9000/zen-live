import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="p-6">
      <Skeleton className="h-10 w-[300px] my-3" />
      <div className="gap-10 lg:grid lg:grid-cols-2">
        <Skeleton className="h-[500px] w-[700px]" />
        <Skeleton className="h-[500px] w-[700px]" />
      </div>
    </div>
  );
};

export default loading;
