import { auth, db } from "@/firebase/client";
import { isValidEmailFormat } from "@/function/common";
import { FirebaseError } from "@firebase/util";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import PrimaryButton from "../ui/button/PrimaryButton";

const UpdateEmail = () => {
  const [newEmail, setNewEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const inputNewEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewEmail(e.target.value);
    },
    []
  );

  const inputPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const handleUpdateEmail = async () => {
    if (!isValidEmailFormat(newEmail)) {
      alert("メールアドレスの形式が不正です。もう1度お試しください。");
      return;
    }
    if (password.length < 6) {
      alert("パスワードは6文字以上で入力してください。");
      return;
    }
    try {
      const user = auth.currentUser;
      if (user) {
        // Authentication
        const credential = await EmailAuthProvider.credential(
          user?.email ?? "",
          password
        );
        user && (await reauthenticateWithCredential(user, credential));
        user && (await updateEmail(user, newEmail));

        //Firestore
        const uid = user.uid;
        const userDocRef = doc(db, "users", uid);
        await setDoc(
          userDocRef,
          {
            updated_at: serverTimestamp(),
            email: newEmail,
          },
          {
            merge: true, // 既存のデータとマージ
          }
        );
      }
      router.push("/");
      window.location.reload();
      alert(
        "新しいメールアドレスに確認のメールを送信しました。メールをご確認の上、手続きを完了させてください。"
      );
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(e);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          新しいメールアドレス
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="新しいメールアドレスを入力"
          value={newEmail}
          onChange={inputNewEmail}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 font-medium mb-2"
        >
          パスワード
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="パスワードを入力"
          value={password}
          onChange={inputPassword}
        />
      </div>
      <div className="mb-4">
        <PrimaryButton handleClick={handleUpdateEmail}>更新</PrimaryButton>
      </div>
    </div>
  );
};

export default UpdateEmail;
