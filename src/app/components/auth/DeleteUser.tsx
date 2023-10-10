import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/client";
import { FirebaseError } from "@firebase/util";
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";

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
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleDeleteUser}
        >
          退会する
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;
