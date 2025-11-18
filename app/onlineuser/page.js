"use client";

import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config";
import { UsersContexts } from "../usercontext";
import { useRouter } from "next/navigation";

export default function ActiveUser({ children }) {
  const router = useRouter();
  const { users, setUsers } = useContext(UsersContexts);
  const [loading, setLoading] = useState(true);

  // TRACK FIREBASE AUTH STATE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsers(user || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUsers]);

  // Redirect when not logged in
  useEffect(() => {
    if (!loading && !users?.uid) {
      router.replace("/login");
    }
  }, [loading, users, router]);

  // Show nothing until we decide
  if (loading) return null;

  // If user found → show children
  if (users?.uid) return <>{children}</>;

  return null; // While redirect happens
}
