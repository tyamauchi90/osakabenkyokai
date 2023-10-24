import { useCallback, useState } from "react";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { db } from "../../../firebase/client";
import { doc, setDoc } from "firebase/firestore";
import {
  isValidRequiredInput,
  isValidEmailFormat,
} from "../../../function/common";
import { useRouter } from "next/navigation";
import { Timestamp } from "firebase/firestore";
import { auth } from "@/firebase/client";
import { useAppDispatch } from "@/app/redux/hooks";
import { signedUp, signedUpFailure } from "@/app/redux/userSlice";
import PrimaryButton from "../atoms/button/PrimaryButton";
import PrimaryInput from "../atoms/input/PrimaryInput";
import PrimaryLabel from "../atoms/label/PrimaryLabel";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const inputUsername = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    },
    []
  );

  const inputEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const inputPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const inputConfirmPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value);
    },
    []
  );

  const handleSignUp = async () => {
    if (!isValidRequiredInput(username, email, password, confirmPassword)) {
      alert("必須項目が未入力です。");
      return;
    }
    if (!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です。もう1度お試しください。");
      return;
    }
    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう1度お試しください。");
      return;
    }
    if (password.length < 6) {
      alert("パスワードは6文字以上で入力してください。");
      return;
    }

    try {
      const result: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;

      if (user) {
        await sendEmailVerification(user);
        const uid = user.uid;
        const timestamp = Timestamp.now();

        const userInitialData = {
          created_at: timestamp,
          email: email,
          role: "member",
          uid: uid,
          updated_at: timestamp,
          username: username,
          password: password,
        };

        const userDocRef = doc(db, "users", uid);
        await setDoc(userDocRef, userInitialData);
        await updateProfile(user, {
          displayName: username,
        });
        dispatch(signedUp());
        router.push("/");
        alert("確認メールを送信しました。有効化をお願いします。");
      }
    } catch (error) {
      dispatch(signedUpFailure(error));
      alert("アカウント登録に失敗しました。もう1度お試しください。");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">アカウント登録</h2>
      <div className="mb-4">
        <PrimaryLabel htmlFor="username">
          ユーザー名
          <PrimaryInput
            type="text"
            id="username"
            placeholder="ユーザー名を入力"
            value={username}
            handleChange={inputUsername}
          />
        </PrimaryLabel>
        {/* <label
          htmlFor="username"
          className="block text-gray-700 font-medium mb-2"
        >
          ユーザー名
        </label>
        <input
          type="text"
          id="username"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="ユーザー名を入力"
          value={username}
          onChange={inputUsername}
        /> */}
      </div>
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
      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block text-gray-700 font-medium mb-2"
        >
          パスワード確認
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="パスワードを再入力"
          value={confirmPassword}
          onChange={inputConfirmPassword}
        />
      </div>
      <div className="mb-4">
        <PrimaryButton handleClick={handleSignUp}>登録</PrimaryButton>
      </div>
    </div>
  );
};

export default SignUp;
