import { Timestamp, addDoc, collection, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../../firebase/client";

type FormValuesType = {
  title: string;
  eventDate: Date;
  content: string;
};

// リクエストボディをパースする関数
async function parseBody(request: NextRequest): Promise<FormValuesType> {
  if (request.body) {
    const bodyResponse = new Response(request.body);
    const bodyText = await bodyResponse.text();
    return JSON.parse(bodyText) as FormValuesType;
  }
  throw new Error("リクエストボディがnullです。");
}

export async function POST(req: NextRequest) {
  try {
    const postsCollectionRef = collection(db, "posts");

    // リクエストボディをパースする
    const formData = await parseBody(req);
    // Firestoreに更新をかけるデータ
    const data = {
      title: formData.title,
      eventDate: Timestamp.fromDate(new Date(formData.eventDate)),
      content: formData.content,
      updated_at: Timestamp.now(),
    };
    const docRef = await addDoc(postsCollectionRef, data);

    // 生成されたドキュメントIDをidにセットする
    await updateDoc(docRef, {
      id: docRef.id,
    });
    // 成功レスポンスを返す（必須）
    return NextResponse.json({
      message: "ポスト処理が成功しました。",
    });
  } catch (error: any) {
    console.error(error.message || error);
    console.error(error.stack);
    return NextResponse.json({
      error: "ポスト処理が異常終了しました。",
    });
  }
}
