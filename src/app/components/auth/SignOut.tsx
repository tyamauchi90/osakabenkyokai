import { useAppDispatch } from "@/app/redux/hooks";
import { signedOut } from "@/app/redux/userSlice";
import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebase/client";
import { useToast } from "../shadcn/ui/use-toast";
import PrimaryButton from "../ui/button/PrimaryButton";

const SignOut = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(signedOut());
      router.push("/");
      toast({
        title: "ログアウト完了",
        description: "ログアウトしました",
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);
        // alert(error.message);
        toast({
          title: "ログアウト失敗",
          description: "ログアウトできませんでした。もう一度お試しください。",
        });
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
