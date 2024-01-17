"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";
import { useChatSidebar } from "@/store/use-chat-sidebar";

export const ChatToggle = () => {
  const { collapsed, onExpand, onCollapse } = useChatSidebar((state) => state);
  const label = collapsed ? "Expand" : "Collapse";
  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };
  return (
    <Hint label={label} side="left" asChild>
      <Button
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
        variant="ghost"
        onClick={onToggle}
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};

export const ChatToggleSkeleton = () => {
  return (
    <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  );
};
