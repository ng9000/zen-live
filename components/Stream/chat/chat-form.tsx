"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatInfo } from "./chat-info";
import { EmojiInput } from "./emoji-input";

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  setValue: Dispatch<SetStateAction<string>>;
  isHidden: boolean;
  isFollowersOnly: boolean;
  isFollowing: boolean;
  isDelayed: boolean;
}

export const ChatForm = ({
  onSubmit,
  value,
  onChange,
  isHidden,
  isFollowersOnly,
  isFollowing,
  isDelayed,
  setValue,
}: ChatFormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);
  const scrollRef = useRef<HTMLFormElement | null>(null);
  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (isHidden) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-4 p-3"
      ref={scrollRef}
    >
      <div className="w-full">
        <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
        <EmojiInput
          onChange={onChange}
          value={value}
          isFollowersOnly={isFollowersOnly}
          isDelayed={isDelayed}
          setValue={setValue}
          disabled={isDisabled}
        />
      </div>

      <div className="w-full">
        <Button
          type="submit"
          className="w-full"
          variant="primary"
          size="sm"
          disabled={isDisabled}
        >
          Send
        </Button>
      </div>
    </form>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};
