"use client";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/firebase/client";
import { useEffect, useState } from "react";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import SignOut from "./components/auth/SignOut";
import useUserByEmail from "./components/hooks/useUserByEmail";
import ResetPassword from "./components/auth/ResetPassword";
import UpdateEmail from "./components/auth/UpdateEmail";
import DeleteUser from "./components/auth/DeleteUser";
import UpdateUsername from "./components/auth/UpdateUsername";

export default function Home() {
  const [user, setUser] = useState(auth.currentUser);
  // const [signInUser, setSignInUser] = useState<string | null>(null);
  console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // ログインしている場合の処理
        setUser(user);
        // try {
        //   const currentUser = await useUserByEmail(user.email);
        //   setSignInUser(currentUser?.username || null);
        // } catch (error) {
        //   console.error("ユーザー情報の取得エラー:", error);
        // }
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
      <br />
      {user ? (
        <>
          {user.emailVerified ? (
            <p>サインイン中です！</p>
          ) : (
            <p>まだ認証が済んでいません。メールをご確認ください</p>
          )}
          <br />
          <p>【表示名】　{user.displayName}</p>
          <p>【uid】　{user.uid}</p>
          <p>【email】{user.email}</p>
          {user?.photoURL ? (
            <img src={user.photoURL} alt="ユーザーのプロフィール画像" />
          ) : null}
          <br />
          <UpdateEmail />
          <br />
          <UpdateUsername />
          <br />
          <ResetPassword firebaseAuth={auth} />
          <br />
          <SignOut />
          <br />
          <DeleteUser />
        </>
      ) : (
        <>
          <SignIn />
          <SignUp />
        </>
      )}
    </>
  );
}
