"use client";

import { cn, stringToColor } from "@/lib/utils";
import { onBlock, onModBlock } from "@/action/block";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { MinusCircle, Sparkle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { addModerator } from "@/action/moderator";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
  moderator?: boolean;
}

export const CommunityItem = ({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
  moderator,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();
  const color = stringToColor(participantName || "");

  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const handleBlock = () => {
    // if (!participantName || isSelf || !isHost) return;

    if (moderator) {
      startTransition(() => {
        onModBlock(participantIdentity, hostName)
          .then(() => toast.success(`Blocked ${participantName}`))
          .catch(() => toast.error("Something went wrong"));
      });
    } else {
      startTransition(() => {
        onBlock(participantIdentity)
          .then(() => toast.success(`Blocked ${participantName}`))
          .catch(() => toast.error("Something went wrong"));
      });
    }
  };

  const newModerator = () => {
    if (!moderator) {
      startTransition(() => {
        if (participantName) {
          addModerator({
            userId: participantIdentity,
            username: participantName,
          })
            .then(() => toast.success(`Assigned ${participantName} moderator`))
            .catch(() => toast.error("Something went wrong"));
        }
      });
    }
  };
  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      <div className="">
        {isHost && (
          <Hint label="Promote to moderator">
            <Button
              variant="ghost"
              disabled={isPending}
              onClick={newModerator}
              className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
            >
              <Sparkle className="h-4 w-4 text-muted-foreground" />
            </Button>
          </Hint>
        )}

        {!isSelf && (isHost || moderator) && (
          <Hint label="Block">
            <Button
              variant="ghost"
              disabled={isPending}
              onClick={handleBlock}
              className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
            >
              <MinusCircle className="h-4 w-4 text-muted-foreground" />
            </Button>
          </Hint>
        )}
      </div>
    </div>
  );
};
