import { DataTable } from "./_components/data-table";

import moment from "moment";

import { getBlockedUsers } from "@/lib/block-service";
import { blockedUsersColumn } from "./_components/columns";

const CommunityPage = async () => {
  const blockedUsers = await getBlockedUsers();

  const formattedData = blockedUsers.map((user) => ({
    ...user,
    userId: user.blocked.id,
    imageUrl: user.blocked.imageUrl,
    username: user.blocked.username,
    createdAt: moment(user.blocked.createdAt).format("LLL"),
  }));

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community settings</h1>
      </div>
      <DataTable columns={blockedUsersColumn} data={formattedData} />
    </div>
  );
};

export default CommunityPage;
