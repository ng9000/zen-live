"use client";

import { deleteModerator } from "@/action/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface RemoveModButtonProps {
  userId: string;
}

export const RemoveModButton = ({ userId }: RemoveModButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      deleteModerator(userId)
        .then(() => toast.success(`Removed moderator`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="link"
      size="sm"
      className="text-blue-500 w-full"
    >
      Remove moderator
    </Button>
  );
};
