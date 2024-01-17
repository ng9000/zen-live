import { URLCard } from "./_components/url-card";
import { getSelf } from "@/lib/auth-service";
import { getStreamById } from "@/lib/stream-service";
import { KeyCard } from "./_components/key-card";
import { ConnectModal } from "./_components/connect-modal";

const KeysPage = async () => {
  const self = await getSelf();
  const stream = await getStreamById(self.id);
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys and URL's</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <URLCard value={stream?.serverUrl} />
        <KeyCard value={stream?.streamKey} />
      </div>
    </div>
  );
};

export default KeysPage;
