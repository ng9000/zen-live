"use client";
import { ConnectionState, Track } from "livekit-client";
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import { OfflineVideo } from "./loading-states/offline-video";
import { LoadingVideo } from "./loading-states/loading-video";
import { LiveVideo } from "./loading-states/live-video";
import { Skeleton } from "../ui/skeleton";
interface VideoPlayerProps {
  hostname: string;
  hostIdentity: string;
}
export const VideoPlayer = ({ hostname, hostIdentity }: VideoPlayerProps) => {
  const connectionState = useConnectionState();
  const participants = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content;

  if (!participants && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostname} />;
  } else if (!participants || tracks.length === 0) {
    content = <LoadingVideo label={connectionState} />;
  } else {
    content = <LiveVideo participant={participants} />;
  }
  return <div className="aspect-video border-b group relative">{content}</div>;
};

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
};
