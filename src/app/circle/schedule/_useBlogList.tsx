"use client";
import { db } from "@/firebase/client";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import type { postType } from "../../type/postType";

function useBlogList() {
  const [posts, setPosts] = useState<postType[]>([]);

  useEffect(() => {
    // Firestoreから投稿データを取得する（clientSDKバージョン）
    async function fetchPosts() {
      const postsCollectionRef = collection(db, "posts");
      try {
        const querySnapshot = await getDocs(postsCollectionRef);
        const postsData: postType[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const post = doc.data();
          const postData: postType = {
            id: doc.id, // ドキュメントIDを設定
            ...post,
          };
          postsData.push(postData);
        });
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);

  return posts;
}

export default useBlogList;
