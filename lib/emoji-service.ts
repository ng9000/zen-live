import { getSelf } from "./auth-service";
import { db } from "./db";

export const userEmojis = async () => {
  const self = await getSelf();
  const categories = await db.emojiCategories.findMany({
    where: {
      creatorId: self.id,
    },
    include: {
      emojis: {
        include: {
          skins: true,
        },
      },
    },
  });
  return categories;
};
