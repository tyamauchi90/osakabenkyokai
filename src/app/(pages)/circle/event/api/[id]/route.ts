import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../../firebase/client";
import { postType } from "../../../../../type/postType";

// GET
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    // Firestoreから投稿データを取得する（clientSDKバージョン）
    const fetchPost = async function (id: string) {
      const postDocRef = doc(db, "posts", id);
      try {
        const docSnap = await getDoc(postDocRef);
        if (docSnap.exists()) {
          const post = docSnap.data();
          const postData: postType = {
            id: docSnap.id, // ドキュメントIDを設定
            ...post,
          };
          return postData;
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    const post = await fetchPost(id);
    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "投稿を取得することができませんでした。",
    });
  }
}

