import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";

interface URLCardProps {
  value: string | null | undefined;
}

export const URLCard = ({ value }: URLCardProps) => {
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-3">
        <p className="font-semibold">Server URL</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input value={value || ""} disabled placeholder="Server URL" />
            <CopyButton value={value || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};
