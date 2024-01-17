"use client";

import { onFollow, onUnfollow } from "@/action/follow";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  hostIdentity: string;
  isHost: boolean;
}
export const Actions = ({
  isFollowing,
  hostIdentity,
  isHost,
}: ActionsProps) => {
  const { userId } = useAuth();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleFollow = () => {
    if (!userId) return router.push("/sign-in");
    if (isHost) return;
    if (isFollowing) {
      startTransition(() => {
        onUnfollow(hostIdentity)
          .then((data) => {
            toast.success(`You have unfollowed ${data.following.username}`);
          })
          .catch(() => {
            toast.error("Something went wrong");
          });
      });
    } else {
      startTransition(() => {
        onFollow(hostIdentity)
          .then((data) => {
            toast.success(`You are now following ${data.following.username}`);
          })
          .catch(() => {
            toast.error("Something went wrong");
          });
      });
    }
  };
  return (
    <Button
      disabled={isPending || isHost}
      variant="primary"
      onClick={handleFollow}
      size="sm"
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export const ActionSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
