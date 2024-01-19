import { DataTable } from "./_components/data-table";

import moment from "moment";

import { getBlockedUsers } from "@/lib/block-service";
import { getModerators } from "@/lib/moderator-service";
import { blockedUsersColumn, moderatorsColumn } from "./_components/columns";

const CommunityPage = async () => {
  const blockedUsers = await getBlockedUsers();
  const moderators = await getModerators();
  // console.log(moderators, "+++++++++++++++++");

  const formattedData = blockedUsers.map((user) => ({
    ...user,
    userId: user.blocked.id,
    imageUrl: user.blocked.imageUrl,
    username: user.blocked.username,
    createdAt: moment(user.blocked.createdAt).format("LLL"),
  }));

  const mods = moderators.map((user) => ({
    ...user,
    userId: user.moderator.id,
    imageUrl: user.moderator.imageUrl,
    username: user.moderator.username,
    createdAt: moment(user.createdAt).format("LLL"),
  }));

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community settings</h1>
      </div>
      <DataTable columns={blockedUsersColumn} data={formattedData} />
      <h1 className="mt-5 text-2xl">Moderators</h1>
      <DataTable columns={moderatorsColumn} data={mods} />
    </div>
  );
};

export default CommunityPage;
