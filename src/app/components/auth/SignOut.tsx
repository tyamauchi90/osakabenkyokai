import { Auth, getAuth, initializeAuth, signOut } from "firebase/auth"; // Firebase AuthenticationのメソッドとAuthのインポート
import { auth } from "../../../firebase/client";
import { useAppDispatch } from "@/app/redux/hooks";
import { FirebaseError } from "firebase/app";
import { signedOut } from "@/app/redux/userSlice";

const SignOut = () => {
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(signedOut());
      // alert("ログアウトしました");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);
        alert(error.message);
      }
    }
  };

  return (
    <div className="signOut">
      <button onClick={handleSignOut}>サインアウト</button>
    </div>
  );
};

export default SignOut;
