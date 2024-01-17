"use client";

import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye } from "lucide-react";

interface KeyCardProps {
  value?: string | null;
}

export const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-3">
        <p className="font-semibold">Stream key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ""}
              disabled
              placeholder="Stream key"
              type={show ? "text" : "password"}
            />
            <Button size={"sm"} variant="link" onClick={() => setShow(!show)}>
              <Eye />
            </Button>
            <CopyButton value={value || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};
