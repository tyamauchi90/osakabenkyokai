import { auth, db } from "@/firebase/client";
import { FirebaseError } from "@firebase/util";
import { deleteUser } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import PrimaryButton from "../ui/button/PrimaryButton";

const DeleteUser = () => {
  const router = useRouter();

  const handleDeleteUser = async () => {
    try {
      const user = auth.currentUser;
      // const credential = await EmailAuthProvider.credential(
      //   user?.email ?? "",
      //   password
      // );
      // await reauthenticateWithCredential(user, credential);
      if (user) {
        if (confirm("本当に退会手続きをしていいですか？")) {
          const uid = user.uid;
          await deleteUser(user);
          if (uid) {
            deleteDoc(doc(db, "users", uid));
          }
          alert("退会手続きが完了しました");
          router.push("/");
        } else {
          router.push("/");
        }
      }
    } catch (e) {
      if (e instanceof FirebaseError) {
        alert(
          "エラーが発生しました。もう一度サインインをしてから退会手続き行ってください"
        );
        console.error(e);
        router.push("/");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <PrimaryButton handleClick={handleDeleteUser}>退会する</PrimaryButton>
      </div>
    </div>
  );
};

export default DeleteUser;
