"use client";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/firebase/client";
import { useEffect, useState } from "react";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import SignOut from "./components/auth/SignOut";
import Example from "./components/auth/Example";

export default function Home() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ログインしている場合の処理
        setUser(user);
      } else {
        // ログアウトしている場合の処理
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <h1>トップページ</h1>
      {user ? (
        <SignOut />
      ) : (
        <>
          <SignIn />
          <SignUp />
        </>
      )}
      <p>{user?.displayName}</p>
      {user?.photoURL ? (
        <img src={user.photoURL} alt="ユーザーのプロフィール画像" />
      ) : null}
    </>
  );
}
