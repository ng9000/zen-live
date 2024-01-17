import { getBlockedUsers } from "@/lib/block-service";
import { format } from "date-fns";
import React from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const CommunityPage = async () => {
  const blockedUsers = await getBlockedUsers();
  const formattedData = blockedUsers.map((user) => ({
    ...user,
    userId: user.blocked.id,
    imageUrl: user.blocked.imageUrl,
    username: user.blocked.username,
    createdAt: format(new Date(user.blocked.createdAt), "dd/mm/yyyy"),
  }));
  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community settings</h1>
      </div>
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
};

export default CommunityPage;
