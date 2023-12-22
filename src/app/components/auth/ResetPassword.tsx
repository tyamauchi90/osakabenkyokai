import { auth } from "@/firebase/client";
import { FirebaseError } from "firebase/app";
import {
  ActionCodeSettings,
  Auth,
  User,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { FC, MouseEvent } from "react";
import { useToast } from "../shadcn/ui/use-toast";
import PrimaryButton from "../ui/button/PrimaryButton";

interface ResetPasswordProps {
  firebaseAuth: Auth;
}

const ResetPassword: FC<ResetPasswordProps> = ({ firebaseAuth }) => {
  const router = useRouter();
  const { toast } = useToast();

  const actionCodeSettings: ActionCodeSettings = {
    url: process.env.NEXT_PUBLIC_FIREBASE_MAIL_URL as string,
    handleCodeInApp: false,
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email, actionCodeSettings);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetPassword = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const user: User | null = auth.currentUser;
      if (user) {
        await resetPassword(user.email!); // ユーザーのメールアドレスを指定

        router.push("/");
        toast({
          title: "パスワードリセット",
          description:
            "再設定用のメールを送信しました。メールをご確認の上、パスワードを再設定してください。",
        });
      }
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(e);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto my-7">
      <div className="mb-4">
        <PrimaryButton handleClick={handleResetPassword}>
          パスワードをリセット
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ResetPassword;
