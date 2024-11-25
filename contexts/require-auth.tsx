'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const RequireAuth = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    } else {
      router.push("/");
    }
  }, []);

  if (!user) return <></>;

  return children;
};
