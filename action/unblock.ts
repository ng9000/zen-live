"use server";
import { revalidatePath } from "next/cache";

import { getSelf } from "@/lib/auth-service";
import { unBlockUser } from "@/lib/block-service";

export const onUnblock = async (id: string) => {
  const self = await getSelf();
  const unblockedUser = await unBlockUser(id);

  revalidatePath(`/u/${self.username}/community`);
  return unblockedUser;
};
