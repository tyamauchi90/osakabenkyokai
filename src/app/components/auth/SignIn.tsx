import { useCallback, useState } from "react";
// import { signIn } from "../../redux/operations";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signInFailure, signInSuccess } from "@/app/redux/userSlice";
import { signIn } from "@/app/redux/operations";

const SignIn = () => {
  const dispatch = useAppDispatch();
  // const user = useAppSelector((state) => state.user);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

  return (
    <div className="max-w-md mx-auto">
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
          // onClick={() => dispatch(signIn(email, password))}
          onClick={() => dispatch(signIn(email, password))}
        >
          サインイン
        </button>
      </div>
    </div>
  );
};

export default SignIn;
