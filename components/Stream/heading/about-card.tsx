import { VerifiedMark } from "@/components/verified-mark";
import { BioModal } from "./bio-modal";

interface AboutCardProps {
  hostIdentity: string;
  viewerIdentity: string;
  hostName: string;
  bio?: string | null;
  followedBycount: number;
}

export const AboutCard = ({
  hostIdentity,
  viewerIdentity,
  hostName,
  bio,
  followedBycount,
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;
  const followedBy = followedBycount === 1 ? "Follower" : "Followers";
  return (
    <div className="px-4">
      <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About {hostName}
            <VerifiedMark />
          </div>
          {isHost && <BioModal initialValue={bio} />}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{followedBycount}</span>
          &nbsp;
          {followedBy}
        </div>
        <p className="text-sm">{bio || "I am anonymous"}</p>
      </div>
    </div>
  );
};
