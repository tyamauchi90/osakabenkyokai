import { Timestamp, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../../../firebase/client";

// POST : 仮予約
export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    const { id, userId, userName, existingApplicationDocData, overwrite } =
      request;

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

    // if (!overwrite) {
    //   console.error("処理を中止しました");
    //   return new NextResponse(JSON.stringify({ error: "処理を中止しました" }), {
    //     status: 400,
    //     headers: { "Content-Type": "application/json" },
    //   });
    // }

    const addData = async function (
      id: string,
      userId: string,
      userName: string,
      existingApplicationDocData: any,
      overwrite: boolean
    ) {
      const postRef = doc(db, "posts", id);
      const postSnapshot = await getDoc(postRef);
      const postEventData = postSnapshot.data();

      const applicationData = {
        postId: id,
        eventDate: postEventData?.eventDate || null,
        userId,
        userName,
        applyDate: Timestamp.now(),
        isPaid: false,
      };

      const applicationRef = collection(postRef, "applications");

      try {
        if (existingApplicationDocData && overwrite) {
          // データが存在し、上書きが許可されている場合、上書き
          const existingApplicationRef = doc(applicationRef, userId);
          await setDoc(existingApplicationRef, applicationData, {
            merge: true,
          });
        } else if (!existingApplicationDocData) {
          // データが存在しない場合、新規登録
          const newApplicationRef = doc(applicationRef, userId);
          await setDoc(newApplicationRef, applicationData);
        } else {
          // existingApplicationDocData が undefined の場合のエラーハンドリング
          console.error("existingApplicationDocData is undefined");
          throw new Error("existingApplicationDocData is undefined");
        }

        return new NextResponse(
          JSON.stringify({ message: "Form data received" }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
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
    };

    return await addData(
      id,
      userId,
      userName,
      existingApplicationDocData,
      overwrite
    );
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
