import { User } from "firebase/auth";
import { Timestamp, addDoc, collection, doc, getDoc } from "firebase/firestore";
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
export async function POST(req: Request) {
  try {
    const request = await req.json();
    const { id, user, userName } = request;

    if (!id) {
      console.error("IDが未定義です。");
      return;
    }

    if (!user) {
      console.error("ユーザーが存在しません。");
      return;
    }

    const addData = async function (id: string, user: User, userName: string) {
      const postRef = doc(db, "posts", id);
      const postSnapshot = await getDoc(postRef);
      const postEventData = postSnapshot.data();

      const applicationData = {
        eventDate: postEventData?.eventDate || null,
        userId: user?.uid,
        userName: userName,
        applyDate: Timestamp.now(),
        isPaid: false,
      };
      const applicationRef = collection(postRef, "applications");
      await addDoc(applicationRef, applicationData);
    };
    await addData(id, user, userName);
    return new NextResponse(JSON.stringify({ message: "Form data received" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error(error.message || error);
    return NextResponse.json({
      error: "ポスト処理が異常終了しました。",
    });
  }
}

// // 申込み処理
// const stripePromise = loadStripe("ここにStripeの公開鍵を入力してください"); // Stripeの初期化
// async function handleApply(pay: boolean) {
//   const user = useAuthCurrentUser();
//   const userId = user?.uid;

//   if (pay) {
//     // Stripeを使用して決済を行う
//     const stripe = await stripePromise;
//     const { error } = await stripe.redirectToCheckout({
//       // ここにStripe Checkoutの設定を入力してください
//     });

//     if (error) {
//       console.error(error);
//     } else {
//       // 決済が成功したらFirestoreに申込み情報を登録する
//       const applicationRef = doc(
//         collection(db, `posts/${id}/applications`)
//       );
//       await setDoc(applicationRef, {
//         userId: userId,
//         applicationDate: new Date().toISOString(),
//       });
//     }
//   } else {
//     // 決済せずにFirestoreに申込み情報を登録する
//     const applicationRef = doc(collection(db, `posts/${id}/applications`));
//     await setDoc(applicationRef, {
//       userId: userId,
//       applicationDate: new Date().toISOString(),
//     });
//   }
// }
// handleApply(pay);
