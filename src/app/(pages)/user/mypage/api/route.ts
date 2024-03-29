import { Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { firebaseAdmin } from "../../../../../firebase/admin";

type DocType = {
  eventDate: Timestamp;
  userId: string;
  userName: string;
  applyDate: Timestamp;
  isPaid: boolean;
};

export async function GET(req: NextRequest) {
  try {
    // 認証情報を取得
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Authorization header is missing");
    }
    // トークンをデコード
    const decodedToken = await firebaseAdmin
      .auth()
      .verifyIdToken(authHeader.replace("Bearer ", ""));
    const userId = decodedToken.uid;

    // Firestoreのクエリを実行
    const postsRef = firebaseAdmin.firestore().collection("posts");
    const postsSnapshot = await postsRef.get();

    const applicationsArray: DocType[] = [];

    for (const postDoc of postsSnapshot.docs) {
      const applicationsRef = postDoc.ref.collection("applications");
      const applicationSnapshot = await applicationsRef.get();

      // applicationサブコレクション内にドキュメントが存在するか検証
      if (!applicationSnapshot.empty) {
        // applicationサブコレクション内のuserIdとログインユーザーのuidがイコールのドキュメントを取得
        const userApplicationSnapshot = await applicationsRef
          .where("userId", "==", userId)
          .get();

        if (!userApplicationSnapshot.empty) {
          userApplicationSnapshot.forEach((applicationData: any) => {
            applicationsArray.push({
              // id: applicationData.id,
              ...(applicationData.data() as DocType),
            });
          });
        }
      }
    }

    return new Response(JSON.stringify({ applicationsArray }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// キャンセル
export async function DELETE(req: NextRequest) {
  const request = await req.json();
  const { postId, userId } = request;

  try {
    const postRef = firebaseAdmin.firestore().collection("posts").doc(postId);
    const appsSnapshot = await postRef
      .collection("applications")
      .where("postId", "==", postId)
      .where("userId", "==", userId)
      .get();

    // キャンセル処理
    if (!appsSnapshot.empty) {
      appsSnapshot.docs[0].ref.delete();
    }
    return NextResponse.json({
      message: "Reservation cancelled successfully.",
    });
  } catch (error) {
    console.error("Error Deleting reservation:", error);
    return NextResponse.json({
      error: "申込みをキャンセルすることができませんでした。",
    });
  }
}
