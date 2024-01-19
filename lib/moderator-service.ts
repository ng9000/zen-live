import { getSelf } from "./auth-service";
import { db } from "./db";

export const getModerators = async () => {
  const self = await getSelf();
  const allModerators = await db.moderator.findMany({
    where: {
      streamerId: self.id,
    },
    include: {
      moderator: true,
    },
  });
  return allModerators;
};

export const amIModerator = async (streamerId?: string) => {
  try {
    const self = await getSelf();

    if (streamerId && self.id) {
      const amIMod = await db.moderator.findUnique({
        where: {
          streamerId_moderatorId: {
            streamerId: streamerId,
            moderatorId: self.id,
          },
        },
      });

      return !!amIMod;
    }
  } catch (error) {
    return false;
  }
};
interface ModProps {
  userId: string;
  streamerId: string;
}
export const removeModerator = async ({ userId, streamerId }: ModProps) => {
  const removeMod = await db.moderator.delete({
    where: {
      streamerId_moderatorId: {
        streamerId: streamerId,
        moderatorId: userId,
      },
    },
  });

  return removeMod;
};

interface NewModProps {
  userId: string;
  streamerId: string;
  username: string;
}
export const newModerator = async ({
  userId,
  streamerId,
  username,
}: NewModProps) => {
  const newMod = await db.moderator.create({
    data: {
      moderatorId: userId,
      streamerId: streamerId,
      moderatorUsername: username,
    },
  });
  return newMod;
};
