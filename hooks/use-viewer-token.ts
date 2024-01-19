"use client";
import { toast } from "sonner";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

import { createViewerToken } from "@/action/token";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");
  const [mod, setMod] = useState<boolean>();

  const createToken = async () => {
    try {
      const viewerToken = await createViewerToken(hostIdentity);

      setToken(viewerToken);

      const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
        name?: string;
        metadata?: string;
      };

      const name = decodedToken.name;
      const identity = decodedToken.jti;
      const moderator = decodedToken.metadata;
      if (identity) {
        setIdentity(identity);
      }
      if (moderator === "true") {
        setMod(true);
      } else {
        setMod(false);
      }
      if (name) {
        setName(name);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    createToken();
  }, [hostIdentity]);

  return {
    token,
    name,
    identity,
    mod,
  };
};
