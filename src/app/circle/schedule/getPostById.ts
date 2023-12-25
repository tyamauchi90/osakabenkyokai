import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/client";
import { postType } from "../../type/postType";

// 投稿詳細取得
const getPostById = async ({
  postId,
}: {
  postId: string | null;
}): Promise<postType | null> => {
  try {
    // postIdがnullでないことを確認
    if (!postId) {
      return null;
    }

    const postRef = doc(db, "posts", postId);
    const postSnapshot = await getDoc(postRef);

    // ドキュメントが存在しない場合
    if (!postSnapshot.exists()) {
      return null;
    }

    // 投稿内容を取得
    const post = {
      id: postSnapshot?.id,
      ...postSnapshot.data(),
    } as postType;
    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getPostById;
