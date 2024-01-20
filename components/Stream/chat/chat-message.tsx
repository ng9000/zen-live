"use client";

import { ReceivedChatMessage } from "@livekit/components-react";

import { cn, stringToColor } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface ChatMessageProps {
  data: ReceivedChatMessage;
  moderator?: boolean;
}

export const ChatMessage = ({ data, moderator }: ChatMessageProps) => {
  const color = stringToColor(data.from?.name || "");

  return (
    <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
      {/* <p className="text-sm text-white/40">
        {moment(data.timestamp).format("dd/mm/yyyy")}
      </p> */}
      <div className="flex flex-wrap items-baseline gap-1 grow">
        {moderator ? <Sparkles className="w-3 h-3 text-red-500" /> : null}
        <p className="text-sm font-semibold whitespace-nowrap">
          <span
            className={cn("truncate", moderator && "font-bold")}
            style={{ color: moderator ? "#bd3535" : color }}
          >
            {data.from?.name}
          </span>
          :
        </p>
        <p className="text-sm break-all">{data.message}</p>
      </div>
    </div>
  );
};
