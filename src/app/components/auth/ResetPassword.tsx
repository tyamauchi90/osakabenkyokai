import React, { FC, MouseEvent } from "react";
import {
  ActionCodeSettings,
  Auth,
  sendPasswordResetEmail,
  User,
} from "firebase/auth"; // User型をインポート
import { auth } from "@/firebase/client";

interface ResetPasswordProps {
  firebaseAuth: Auth;
}

const ResetPassword: FC<ResetPasswordProps> = ({ firebaseAuth }) => {
  const actionCodeSettings: ActionCodeSettings = {
    url: process.env.NEXT_PUBLIC_FIREBASE_MAIL_URL as string,
    handleCodeInApp: false,
  };

  const handleResetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email, actionCodeSettings);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user: User | null = auth.currentUser; // User型またはnullを許容するように型指定
    if (user) {
      await handleResetPassword(user.email!); // ユーザーのメールアドレスを指定
    }
  };

  return (
    <div>
      <button onClick={handleClick}>パスワードをリセット</button>
    </div>
  );
};

export default ResetPassword;
