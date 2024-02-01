import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { firebaseAdmin } from "../../../../../../firebase/admin";

export async function POST(req: NextRequest) {
  const request = await req.json();
  const { postId, user, userName, existingApplicationDocData, overwrite } =
    request;

  try {
    const addData = async function (
      postId: string,
      user: User,
      userName: string,
      existingApplicationDocData: any,
      overwrite: boolean
    ) {
      const postRef = firebaseAdmin.firestore().doc(`posts/${postId}`);
      const postSnapshot = await postRef.get();
      const postEventData = postSnapshot.data();

      const applicationData = {
        postId,
        eventDate: postEventData?.eventDate || null,
        userId: user?.uid,
        userName: userName,
        applyDate: Timestamp.now(),
        isPaid: true,
      };

      const applicationsRef = postRef.collection("applications");

      try {
        const applicationRef = applicationsRef.doc(user.uid);
        if (existingApplicationDocData && overwrite) {
          await applicationRef.set(applicationData);
        } else if (!existingApplicationDocData) {
          await applicationRef.set(applicationData);
        } else {
          throw new Error("existingApplicationDocData is undefined");
        }
      } catch (error: any) {
        console.error(error.message || error);
        throw error;
      }
    };

    await addData(
      postId,
      user,
      userName,
      existingApplicationDocData,
      overwrite
    );

    return new NextResponse("Form data received", {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
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
