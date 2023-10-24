import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/client";

interface User {
  // ユーザーのプロパティをここに追加
  username: string;
}

async function useUserByUid(uid: string | null): Promise<User | null> {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (!uid) {
      // UIDが指定されていない場合は何もしない
      setCurrentUser(null);
      return;
    }

    try {
      // ユーザーを取得
      const userDocumentRef = doc(db, "users", uid);

      getDoc(userDocumentRef)
        .then((documentSnapshot) => {
          if (documentSnapshot.exists()) {
            // ドキュメントが存在する場合
            const userData = documentSnapshot.data() as User;
            setCurrentUser(userData);
          } else {
            // ドキュメントが存在しない場合
            setCurrentUser(null);
          }
        })
        .catch((error) => {
          console.error("ユーザー情報の取得エラー:", error);
          setCurrentUser(null);
        });
    } catch (error) {
      console.error("ユーザー情報の取得エラー:", error);
      setCurrentUser(null);
    }
  }, [uid]);

  return currentUser;
}

export default useUserByUid;
