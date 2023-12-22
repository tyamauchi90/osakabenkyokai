import axios, { AxiosError } from "axios";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../../firebase/client";
import type { postType } from "../../../../../type/postType";

// GET
export async function GET(req: NextRequest) {
  try {
    // Firestoreから投稿データを取得する（clientSDKバージョン）
    const fetchPosts = async function () {
      const postsCollectionRef = collection(db, "posts");
      const queryRef = query(postsCollectionRef, orderBy("updated_at", "desc"));
      const postsData: postType[] = [];
      try {
        const querySnapshot = await getDocs(queryRef);
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const post = doc.data();
          const postData: postType = {
            id: doc.id, // ドキュメントIDを設定
            ...post,
          };
          postsData.push(postData);
        });
        return postsData;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    const allPosts = await fetchPosts();
    return NextResponse.json(allPosts);
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
    return [];
  }
}
