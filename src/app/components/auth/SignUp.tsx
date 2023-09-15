import { useCallback, useState } from "react";
import { signUp } from "../../redux/operations";
import { useAppDispatch } from "@/app/redux/hooks";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const inputUsername = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e?.target.value);
    },
    [setUsername]
  );

  const inputEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e?.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e?.target.value);
    },
    [setPassword]
  );

  const inputConfirmPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e?.target.value);
    },
    [setConfirmPassword]
  );

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">アカウント登録</h2>
      <div className="mb-4">
        <label
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
        />
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
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={() =>
            dispatch(signUp(username, email, password, confirmPassword))
          }
        >
          登録
        </button>
      </div>
    </div>
  );
};

export default SignUp;
