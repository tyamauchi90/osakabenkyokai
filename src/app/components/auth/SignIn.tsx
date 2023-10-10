import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { signInSuccess, signInFailure } from "@/app/redux/userSlice";
import { useRouter } from "next/navigation";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/client";
import { FirebaseError } from "firebase/app";
import {
  isValidRequiredInput,
  isValidEmailFormat,
} from "../../../function/common";

const SignIn = () => {
  const isSignedIn = useAppSelector((state) => state.user.isSignedIn);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter(); // 非同期関数の外側で呼び出し

  const inputEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  const handleSignIn = async () => {
    if (!isValidRequiredInput(email, password)) {
      alert("メールアドレスかパスワードが未入力です。");
      return;
    }

    if (!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です。");
      return;
    }

    try {
      const result: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = result.user;
      console.log(user);
      if (!user) {
        throw new Error("ユーザーIDを取得できません");
      }

      const uid = user.uid;
      const userDocRef = doc(db, "users", uid);
      const _snapshot = await getDoc(userDocRef);
      const data = _snapshot.data();

      if (!data) {
        throw new Error("ユーザーデータが存在しません");
      }

      if (data.password != password) {
        await setDoc(
          userDocRef,
          {
            // updated_at: serverTimestamp(),
            password: password,
          },
          {
            merge: true, // 既存のデータとマージ
          }
        );
      }

      dispatch(signInSuccess()); // 非同期関数の外側で呼び出し
      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        dispatch(signInFailure(error.message)); // 非同期関数の外側で呼び出し
        alert(error.message);
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1>ようこそ、{isSignedIn || "ゲスト"}さん！</h1>
      <h2 className="text-2xl font-semibold mb-4">サインイン</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="メールアドレスを入力"
          value={email}
          onChange={inputEmail}
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
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleSignIn}
        >
          サインイン
        </button>
      </div>
    </div>
  );
};

export default SignIn;
