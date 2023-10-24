import { signOut } from "firebase/auth"; // Firebase AuthenticationのメソッドとAuthのインポート
import { auth } from "../../../firebase/client";
import { useAppDispatch } from "@/app/redux/hooks";
import { FirebaseError } from "firebase/app";
import { signedOut } from "@/app/redux/userSlice";
import { useRouter } from "next/navigation";
import PrimaryButton from "../atoms/button/PrimaryButton";

const SignOut = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(signedOut());
      // alert("ログアウトしました");
      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);
        alert(error.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <PrimaryButton handleClick={handleSignOut}>サインアウト</PrimaryButton>
      </div>
    </div>
  );
};

export default SignOut;
