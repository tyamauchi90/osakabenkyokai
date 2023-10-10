import { auth, db } from "@/firebase/client";
import { isValidRequiredInput } from "@/function/common";
import { FirebaseError } from "firebase/app";
import { updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const UpdateUsername = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");

  const inputUsername = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    },
    []
  );

  const handleUpdateUsername = async () => {
    try {
      if (!isValidRequiredInput(username)) {
        alert("必須項目が未入力です。");
        return;
      }

      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const userDocRef = doc(db, "users", uid);
        await setDoc(
          userDocRef,
          {
            updated_at: serverTimestamp(),
            username: username,
          },
          {
            merge: true,// 既存のデータとマージ
          } 
        );
        await updateProfile(user, {
          displayName: username,
        });
      }
      router.push("/");
      window.location.reload();
      alert("表示名を変更しました");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(e);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
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
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleUpdateUsername}
        >
          更新
        </button>
      </div>
    </div>
  );
};

export default UpdateUsername;
