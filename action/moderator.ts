"use server";

import { getSelf } from "@/lib/auth-service";
import { newModerator } from "@/lib/moderator-service";
import { revalidatePath } from "next/cache";

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
    revalidatePath(`/u/${self.id}`);
    revalidatePath(`/${username}`);
    return addMod;
  }
};
