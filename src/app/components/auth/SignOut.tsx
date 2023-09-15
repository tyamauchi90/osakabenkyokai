import { Auth, getAuth, initializeAuth } from "firebase/auth"; // Firebase AuthenticationのメソッドとAuthのインポート
import { auth } from "../../../firebase/client";
import { signOut } from "../../redux/userSlice"; // Reduxのサインアウトアクションをインポート
import { useAppDispatch } from "@/app/redux/hooks";

const SignOut = () => {
  const dispatch = useAppDispatch(); // Reduxのディスパッチ関数を取得
  // Firebase Authenticationの初期化
  // const authInstance = initializeAuth(firebaseApp, authConfig);

  const handleSignOut = async () => {
    try {
      await signOut(); // Authインスタンスを使用してログアウト
      // dispatch(signOut()); // Reduxのサインアウトアクションをディスパッチ
      alert("ログアウトしました");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="signOut">
      <button onClick={handleSignOut}>サインアウト</button>
    </div>
  );
};

export default SignOut;
