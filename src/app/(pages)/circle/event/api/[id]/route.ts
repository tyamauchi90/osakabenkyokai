import { User } from "firebase/auth";
import { Timestamp, collection, doc, getDoc, setDoc } from "firebase/firestore";
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

// POST : 仮予約
export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    const { id, user, userName, existingApplicationDocData, overwrite } =
      request;

    if (!id) {
      console.error("IDが未定義です。");
      return new NextResponse(JSON.stringify({ error: "IDが未定義です。" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!user) {
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
      user: User,
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
        userId: user?.uid,
        userName: userName,
        applyDate: Timestamp.now(),
        isPaid: false,
      };

      const applicationRef = collection(postRef, "applications");

      try {
        if (existingApplicationDocData && overwrite) {
          // データが存在し、上書きが許可されている場合、上書き
          const existingApplicationRef = doc(applicationRef, user.uid);
          await setDoc(existingApplicationRef, applicationData);
        } else if (!existingApplicationDocData) {
          // データが存在しない場合、新規登録
          const newApplicationRef = doc(applicationRef, user.uid);
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
      user,
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

// // キャンセル
// export async function DELETE(req: NextRequest) {
//   const request = await req.json();
//   const { id, userId } = request.query;

//   try {
//     const postRef = doc(db, "posts", id as string);
//     const applicationRef = collection(postRef, "applications");
//     const reservedApplicationRef = doc(applicationRef, userId as string);

//     // キャンセル処理
//     await deleteDoc(reservedApplicationRef);

//     return NextResponse.json({
//       message: "Reservation cancelled successfully.",
//     });
//   } catch (error) {
//     console.error("Error Deleting reservation:", error);
//     return NextResponse.json({
//       error: "申込みをキャンセルすることができませんでした。",
//     });
//   }
// }
