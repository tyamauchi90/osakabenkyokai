"use client";
import { auth } from "@/firebase/client";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useAuthCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });

    // クリーンアップ
    return () => unsubscribe();
  }, []);

  return currentUser;
};

export default useAuthCurrentUser;
