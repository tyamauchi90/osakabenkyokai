import {
  deleteDoc,
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import useAuthCurrentUser from "../../../../components/auth/useAuthCurrentUser";

const firestore = getFirestore();

// 投稿編集
export async function PATCH(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    // リクエストボディの取得
    const body = await request.json();
    const { title, content, eventDate } = body;

    // ログインユーザーの取得
    const currentUser = await useAuthCurrentUser();

    // ログインしていない場合はエラー
    if (!currentUser) {
      return new NextResponse("認証していません", { status: 401 });
    }

    if (!params.postId) {
      return new NextResponse("投稿IDが必要です", { status: 400 });
    }

    // 投稿の編集
    const postRef = doc(firestore, "posts", params.postId);
    await updateDoc(postRef, {
      title,
      content,
      eventDate,
      updatedAt: serverTimestamp(), // 更新日時の記録
    });

    return NextResponse.json({ message: "投稿を編集しました" });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 500 });
  }
}

// 投稿削除
export async function DELETE(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    // ログインユーザーの取得
    const currentUser = await useAuthCurrentUser();

    // ログインしていない場合はエラー
    if (!currentUser) {
      return new NextResponse("認証していません", { status: 401 });
    }

    if (!params.postId) {
      return new NextResponse("投稿IDが必要です", { status: 400 });
    }

    // 投稿の削除
    const postRef = doc(firestore, "posts", params.postId);
    await deleteDoc(postRef);

    return NextResponse.json({ message: "投稿を削除しました" });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 500 });
  }
}
