"use server";
import { getSelf } from "@/lib/auth-service";
import { blockUser } from "@/lib/block-service";
import { removeModerator } from "@/lib/moderator-service";
import { getUserByUsername } from "@/lib/user-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const onBlock = async (id: string) => {
  const self = await getSelf();
  let blockedUser;
  try {
    blockedUser = await blockUser(id);
  } catch (error) {}
  try {
    await roomService.removeParticipant(self.id, id);
  } catch (error) {}
  revalidatePath(`/u/${self.username}/community`);
  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocked.username}`);
  }

  return blockedUser;
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
