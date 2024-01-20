import { getModerators } from "@/lib/moderator-service";
import moment from "moment";
import { DataTable } from "../community/_components/data-table";
import { moderatorsColumn } from "../community/_components/columns";

const ModeratorsPage = async () => {
  const moderators = await getModerators();
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
        <h1 className="text-2xl font-bold">Manage moderators</h1>
      </div>
      <DataTable columns={moderatorsColumn} data={mods} />
    </div>
  );
};

export default ModeratorsPage;
