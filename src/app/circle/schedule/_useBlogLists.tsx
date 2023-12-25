import { firebaseAdmin } from "@/firebase/admin";
import * as admin from "firebase-admin";
import type { postType } from "../../type/postType";

async function useBlogLists() {
  // Firestoreから投稿データを取得（adminSDKバージョン）
  const postsData: postType[] = [];
  const querySnapshot = await firebaseAdmin
    .firestore()
    .collection("posts")
    .get();

  querySnapshot.forEach(
    (
      doc: admin.firestore.QueryDocumentSnapshot<admin.firestore.DocumentData>
    ) => {
      const post = doc.data();
      const postData: postType = {
        id: doc.id,
        ...post,
      };
      postsData.push(postData);
    }
  );
  console.log(postsData);
  return postsData;
}

export default useBlogLists;
