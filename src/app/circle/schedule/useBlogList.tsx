"use client";
import { db } from "@/firebase/client";
import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
  collection,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";

type postsType = {
  id: string;
  title?: string;
  content?: string;
  eventDate?: Timestamp;
};

function useBlogList() {
  const [posts, setPosts] = useState<postsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const postsCollectionRef = collection(db, "posts");
      try {
        const querySnapshot = await getDocs(postsCollectionRef);
        const postsData: postsType[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const post = doc.data();
          const postData: postsType = {
            id: doc.id,
            ...post,
          };
          postsData.push(postData);
        });
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, loading };
}

export default useBlogList;
