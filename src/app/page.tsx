"use client";
import { onAuthStateChanged } from "@firebase/auth";
import Login from "./components/Login";
import Logout from "./components/Logout";
import { auth } from "@/utils/firebase";
import { useEffect, useState } from "react";

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
      {user ? <Logout /> : <Login />}
      <p>{user?.displayName}</p>
      {user?.photoURL ? (
        <img src={user.photoURL} alt="ユーザーのプロフィール画像" />
      ) : null}
    </>
  );
}
