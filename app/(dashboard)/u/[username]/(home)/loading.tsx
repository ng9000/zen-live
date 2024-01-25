//import { StreamPlayerSkeleton } from "@/components/Stream";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatarSkelton } from "@/components/user-avatar";

const loading = () => {
  return (
    <div className="h-full">
      <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <div className="aspect-video border-x border-background">
            <Skeleton className="h-full w-full rounded-none" />
          </div>
          <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
            <div className="flex items-center gap-x-2">
              <UserAvatarSkelton size="lg" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <Skeleton className="h-10 w-full lg:w-24" />
          </div>
        </div>
        <div className="col-span-1 bg-background">
          <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
            <div className="relative p-3 border-b hidden md:block">
              <Skeleton className="absolute h-6 w-6 left-3 top-3" />
              <Skeleton className="w-28 h-6 mx-auto" />
            </div>
            <div className="flex h-full items-center justify-center">
              <Skeleton className="w-1/2 h-6" />
            </div>
            <div className="flex flex-col items-center gap-y-4 p-3">
              <Skeleton className="w-full h-10" />
              <div className="flex items-center gap-x-2 ml-auto">
                <Skeleton className="h-7 w-7" />
                <Skeleton className="h-7 w-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <StreamPlayerSkeleton /> */}
    </div>
  );
};

export default loading;
