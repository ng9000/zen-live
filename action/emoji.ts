"use server";

import { userEmojis } from "@/lib/emoji-service";

export const getAllCategories = async () => {
  const response = await userEmojis();
  return response;
};
