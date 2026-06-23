"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await authClient.getSession();

      if (res?.data?.user) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    load();
  }, []);

  return { user, loading };
}