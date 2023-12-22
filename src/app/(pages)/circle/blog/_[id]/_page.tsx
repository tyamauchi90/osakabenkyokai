// import { FacebookPost } from "@/app/type/facebookPostType";
// import { notFound, useParams } from "next/navigation";

// const accessToken = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;
// const pageId = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID;

// const getAllFacebookPosts = async (id: string) => {
//   const response = await fetch(
//     `https://graph.facebook.com/v18.0/${pageId}/feed?fields=message,created_time,attachments{media,subattachments,image,src}`,
//     // `https://graph.facebook.com/v18.0/${id}?access_token=${accessToken}`,
//     {
//       next: {
//         revalidate: 60, //ISR（Incremental Static Regeneration）設定
//       },
//     }
//   );

//   if (!response.ok) {
//     // エラーハンドリングを実施する
//     console.error(`Error fetching Facebook post with id ${id}`);
//     notFound();
//   }

//   const facebookPosts: FacebookPost = await response.json();

//   return facebookPosts;
// };

// const FacebookPost = async () => {
//   const { postId: postIdParam } = useParams();
//   const postId = Array.isArray(postIdParam) ? postIdParam[0] : postIdParam;

//   const post = await getAllFacebookPosts(postId);
//   let facebookImgUrls: string | string[] | undefined = undefined;

//   if (
//     post.attachments &&
//     post.attachments.data &&
//     post.attachments.data.length > 0 &&
//     post.attachments.data[0].subattachments
//   ) {
//     // 画像が複数ある場合
//     facebookImgUrls = post.attachments.data[0].subattachments.data.map(
//       (subAttachment) => subAttachment.media.image.src
//     );
//   } else if (
//     post.attachments &&
//     post.attachments.data &&
//     post.attachments.data[0].media
//   ) {
//     // 画像が1枚の場合
//     facebookImgUrls = [post.attachments.data[0].media.image.src];
//   }

//   const rawDate = post.created_time;
//   const date = new Date(rawDate);
//   const postDate = `${date.getFullYear()}年${
//     date.getMonth() + 1
//   }月${date.getDate()}日`;
//   if (!post.id) {
//     notFound();
//   }
//   return (
//     <div className="p-2">
//       <h1 className="font-bold text-lg">Facebook投稿詳細ページ {postId}</h1>
//       <div>
//         <div>日付: {postDate}</div>
//         <div>内容: {post.message}</div>
//         {facebookImgUrls && (
//           <div>
//             {facebookImgUrls.map((facebookImgUrl) => (
//               <img key={post.id} src={`${facebookImgUrl}`} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FacebookPost;

// // ダイナミックルート SSG設定
// export async function generateStaticParams() {
//   const response = await fetch(
//     `https://graph.facebook.com/v18.0/${pageId}/feed?fields=message,created_time,attachments{media,subattachments,image,src}`
//     // `https://graph.facebook.com/v18.0?access_token=${accessToken}`
//   );
//   const facebookPosts: FacebookPost[] = await response.json();

//   return facebookPosts.slice(0, 10).map((facebookPost) => ({
//     id: facebookPost.id.toString(),
//   }));
// }
import { FacebookPostType } from "@/app/type/facebookPostType";
import { notFound, useParams } from "next/navigation";

const accessToken = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;
const pageId = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID;

if (!accessToken || !pageId) {
  console.error(
    "Missing environment variables for Facebook access token or page ID."
  );
}

const getAllFacebookPosts = async (id: string) => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}/feed?fields=message,created_time,attachments{media,subattachments,image,src}`,
      {
        next: {
          revalidate: 60, //ISR（Incremental Static Regeneration）設定
        },
      }
    );

    if (!response.ok) {
      console.error(`Error fetching Facebook post with id ${id}`);
      notFound();
    }

    const facebookPosts: FacebookPostType = await response.json();

    return facebookPosts;
  } catch (error) {
    console.error(`Error fetching Facebook post with id ${id}: ${error}`);
    notFound();
  }
};

const FacebookPost = async () => {
  const { postId: postIdParam } = useParams();
  const postId = Array.isArray(postIdParam) ? postIdParam[0] : postIdParam;

  const post = await getAllFacebookPosts(postId);
  let facebookImgUrls: string[] = [];

  if (
    post.attachments &&
    post.attachments.data &&
    post.attachments.data[0]?.subattachments
  ) {
    facebookImgUrls = post.attachments.data[0].subattachments.data.map(
      (subAttachment) => subAttachment.media.image.src
    );
  } else if (
    post.attachments &&
    post.attachments.data &&
    post.attachments.data[0]?.media?.image
  ) {
    facebookImgUrls = [post.attachments.data[0].media.image.src];
  }

  const rawDate = post.created_time;
  const date = new Date(rawDate);
  const postDate = `${date.getFullYear()}年${
    date.getMonth() + 1
  }月${date.getDate()}日`;
  if (!post.id) {
    notFound();
  }
  return (
    <div className="p-2">
      <h1 className="font-bold text-lg">Facebook投稿詳細ページ {postId}</h1>
      <div>
        <div>日付: {postDate}</div>
        <div>内容: {post.message}</div>
        {facebookImgUrls.length > 0 && (
          <div>
            {facebookImgUrls.map((facebookImgUrl, index) => (
              <img key={`${post.id}-${index}`} src={`${facebookImgUrl}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacebookPost;

// ダイナミックルート SSG設定
export async function generateStaticParams() {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}/feed?fields=message,created_time,attachments{media,subattachments,image,src}`
    );
    const facebookPosts: FacebookPostType[] = await response.json();

    return facebookPosts.slice(0, 10).map((facebookPost) => ({
      id: facebookPost.id.toString(),
    }));
  } catch (error) {
    console.error(`Error generating static params: ${error}`);
  }
}
