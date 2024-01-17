"use client";

import { onFollow, onUnfollow } from "@/action/follow";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface ActionProps {
  isFollowing: boolean;
  userId: string;
}
export const Actions = ({ isFollowing, userId }: ActionProps) => {
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => {
          toast.success(`You are now following ${data.following.username}`);
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const handleUnFollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => {
          toast.success(`Unfollowed ${data.following.username}`);
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const onClick = () => {
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };
  return (
    <Button variant="primary" onClick={onClick} disabled={isPending}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
