"use client";
import type { FacebookPostType } from "@/app/type/facebookPostType";
import axios from "axios";
import { useEffect, useState } from "react";

const PostPage = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<FacebookPostType | null>(null);
  const id = params.id;

  useEffect(() => {
    (async function () {
      // 記事取得
      try {
        const res = await axios.get(`/circle/blog/api/${id}`);
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [id]);

  if (!post) {
    return <progress />;
  }

  const rawDate = post.created_time;
  const date = new Date(rawDate);
  console.log(rawDate);
  const facebookPostDate = `${date.getFullYear()}年${
    date.getMonth() + 1
  }月${date.getDate()}日`;

  let facebookImgUrls: string | string[] | undefined = undefined;

  if (
    post.attachments &&
    post.attachments.data &&
    post.attachments.data.length > 0 &&
    post.attachments.data[0].subattachments
  ) {
    // 画像が複数ある場合
    facebookImgUrls = post.attachments.data[0].subattachments.data.map(
      (subAttachment) => subAttachment.media.image.src
    );
  } else if (
    post.attachments &&
    post.attachments.data &&
    post.attachments.data[0].media
  ) {
    // 画像が1枚の場合
    facebookImgUrls = [post.attachments.data[0].media.image.src];
  }

  return (
    <div>
      <h1>
        {facebookPostDate}：{post.message}
      </h1>
      {Array.isArray(facebookImgUrls) && facebookImgUrls.length > 0 && (
        <div>
          {facebookImgUrls.map((imgurl, index) => (
            <img key={index} src={imgurl} alt={`Image ${index}`} />
          ))}
        </div>
      )}
      {typeof facebookImgUrls === "string" && (
        <div>
          <img src={facebookImgUrls} alt="Facebook Post" />
        </div>
      )}
    </div>
  );
};

export default PostPage;
