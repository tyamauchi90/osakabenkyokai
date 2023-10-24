"use client";
import { useEffect, useState } from "react";
import { FacebookPost } from "@/app/type/facebookPostType";
import { getFacebookPosts } from "./getFacebookPosts";

const BlogPage = () => {
  const [posts, setPosts] = useState<FacebookPost[]>([]);

  useEffect(() => {
    async function getAllFacebookPosts() {
      const allPosts = await getFacebookPosts();
      setPosts(allPosts);
    }
    getAllFacebookPosts();
  }, []); // 空の依存配列を指定することで、コンポーネントがマウントされたときのみ実行されます。

  return (
    <div>
      <h1>Facebookの投稿一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
