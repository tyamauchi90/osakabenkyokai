import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../../../firebase/client";

// POST : 予約の重複チェック
export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    const { id, userId } = request;

    if (!id) {
      console.error("IDが未定義です。");
      return new NextResponse(JSON.stringify({ error: "IDが未定義です。" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!userId) {
      console.error("ユーザーが存在しません。");
      return new NextResponse(
        JSON.stringify({ error: "ユーザーが存在しません。" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const findData = async function (id: string, userId: string) {
      const postRef = doc(db, "posts", id);
      const postSnapshot = await getDoc(postRef);
      const postEventData = postSnapshot.data();

      const applicationData = {
        eventDate: postEventData?.eventDate || null,
        userId,
        applyDate: Timestamp.now(),
        isPaid: false || true,
      };

      const applicationRef = collection(postRef, "applications");
      const applicationSnapshot = await getDocs(applicationRef);
      const existingApplicationDoc = applicationSnapshot.docs.find(
        (doc) => doc.data().userId === applicationData.userId
      );
      return new NextResponse(
        JSON.stringify({
          message: "Form data received",
          exists: existingApplicationDoc !== undefined,
          existingApplicationDocData: existingApplicationDoc?.data(),
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    };

    return await findData(id, userId);
  } catch (error: any) {
    console.error(error.message || error);
    return new NextResponse(
      JSON.stringify({
        error: "ポスト処理が異常終了しました。",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
