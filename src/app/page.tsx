"use client";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import firebaseApp from "@/firebase/config";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const auth = getAuth(firebaseApp);

export default function Home() {
  const router = useRouter();
  const user = useContext(AuthContext);

  if (!user) {
    router.push("/signin");
  }

  const onLogoutClick = async () => {
    await signOut(auth);
  };

  return (
    <main className="container border border-red-900 h-dvh">
      <Button onClick={onLogoutClick}>Log out</Button>
    </main>
  );
}
