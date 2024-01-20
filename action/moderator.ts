"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser } from "@/lib/block-service";
import { newModerator, removeModerator } from "@/lib/moderator-service";
import { getUserByUsername } from "@/lib/user-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

interface AddModeratorProps {
  userId: string;
  username: string;
}
export const addModerator = async ({ userId, username }: AddModeratorProps) => {
  const self = await getSelf();
  const addMod = await newModerator({
    userId: userId,
    streamerId: self.id,
    username: username,
  });

  if (addMod) {
    await roomService.removeParticipant(self?.id, userId);

    return addMod;
  }
};

export const onModBlock = async (id: string, streamer: string) => {
  const streamer123 = await getUserByUsername(streamer);

  let blockedUser;
  try {
    blockedUser = await blockUser(id);
  } catch (error) {}
  try {
    if (streamer123) {
      await roomService.removeParticipant(streamer123?.id, id);
    }
  } catch (error) {}
  revalidatePath(`/u/${streamer}/community`);
  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocked.username}`);
  }
  return blockedUser;
};

export const deleteModerator = async (userId: string) => {
  const self = await getSelf();

  const removeMod = await removeModerator({
    userId: userId,
    streamerId: self.id,
  });
  if (removeMod) {
    revalidatePath(`/u/${self.id}/community`);
    await roomService.removeParticipant(self.id, userId);
    return true;
  }
};
