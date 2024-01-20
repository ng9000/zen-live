"use client";
import { cn } from "@/lib/utils";
import { LiveKitRoom } from "@livekit/components-react";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { VideoPlayer, VideoSkeleton } from "./video-player";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { Chat, ChatSkeleton } from "./chat/chat";
import { ChatToggle } from "./chat/chat-toggle";
import { Header, HeaderSkeleton } from "./heading/header";
import { InfoCard } from "./heading/info-card";
import { AboutCard } from "./heading/about-card";

type CustomStream = {
  id: string;
  name: string;
  isLive: boolean;
  thumbnailUrl: string | null;
  isChatDelayed: boolean;
  isChatEnabled: boolean;
  isChatFollowersOnly: boolean;
  updatedAt: Date;
};

type CustomUser = {
  id: string;
  username: string;
  imageUrl: string;
  bio: string | null;
  stream: CustomStream | null;
  _count: { followedBy: number };
};

interface StreamPlayerProps {
  user: CustomUser;
  stream: CustomStream;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { token, identity, name } = useViewerToken(user.id);

  const { collapsed } = useChatSidebar((state) => state);

  if (!token || !identity || !name) {
    return <StreamPlayerSkeleton />;
  }
  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[88px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <VideoPlayer hostname={user.username} hostIdentity={user.id} />
          <Header
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            hostName={user.username}
            isFollowing={isFollowing}
            name={stream.name}
            lastSeen={stream.updatedAt}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
          <AboutCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            hostName={user.username}
            bio={user.bio}
            followedBycount={user._count.followedBy}
          />
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewer={name}
            hostname={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
