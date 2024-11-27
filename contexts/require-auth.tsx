'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/local-storage";
import { User } from "@/types/User";

export const RequireAuth = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [ user ] = useLocalStorage<User>('user')
  const router = useRouter();

  useEffect(() => {
    if (!user?.email) {
      router.push("/");
    }
  }, []);

  if (!user?.email) return <></>;

  return children;
};
