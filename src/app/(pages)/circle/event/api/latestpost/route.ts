import axios, { AxiosError } from "axios";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../../firebase/client";

// GET
export async function GET(req: NextRequest) {
  try {
    // Firestoreから最新の1件の投稿データを取得する（clientSDKバージョン）
    const fetchPost = async function () {
      try {
        const postsCollectionRef = collection(db, "posts");
        const queryRef = query(
          postsCollectionRef,
          orderBy("updated_at", "desc"),
          limit(1)
        );
        const querySnapshot = await getDocs(queryRef);
        const latestPost = querySnapshot.docs[0].data();

        return latestPost;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    const latestPost = await fetchPost();
    return NextResponse.json(latestPost);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error("Response Error: ", axiosError.response.data);
      } else if (axiosError.request) {
        console.error("Request Error: ", axiosError.request);
      } else {
        console.error("Setting Error: ", axiosError.message);
      }
      console.error("Axios Config: ", axiosError.config);
    } else {
      console.error("Unknown Error: ", error);
    }
    // return [];
    return new NextResponse(null, { status: 500 });
  }
}
