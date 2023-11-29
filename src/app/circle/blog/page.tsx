"use client";
import { Button } from "@/app/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/shadcn/ui/card";
import type { FacebookPostType } from "@/app/type/facebookPostType";
import axios from "axios";
import { useEffect, useState } from "react";

const BlogPage = () => {
  const [posts, setPosts] = useState<FacebookPostType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<FacebookPostType | null>(
    null
  );
  const [imgUrls, setImgUrls] = useState<string | string[] | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/circle/blog/api");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateImageUrls = () => {
      if (selectedPost) {
        const urls = getImageUrls(selectedPost);
        setImgUrls(urls);
      }
    };

    updateImageUrls();
  }, [selectedPost]);

  const getImageUrls = (post: FacebookPostType) => {
    // 画像URLを整形
    if (
      // 画像が複数の場合
      post.attachments &&
      post.attachments.data &&
      post.attachments.data.length > 0 &&
      post.attachments.data[0].subattachments
    ) {
      return post.attachments.data[0].subattachments.data.map(
        (subAttachment) => subAttachment.media.image.src
      );
    } else if (
      // 画像が１枚の場合
      post.attachments &&
      post.attachments.data &&
      post.attachments.data[0].media
    ) {
      return [post.attachments.data[0].media.image.src];
    } else {
      return undefined;
    }
  };

  return (
    <>
      <ul
        className={`grid grid-cols-2 gap-4 ${
          isOpen && selectedPost && "overflow-hidden"
        }`}
      >
        {posts.map((post) => {
          // イベント日を整形
          const rawDate = post.created_time;
          const date = new Date(rawDate);
          const facebookPostDate = `${date.getFullYear()}年${
            date.getMonth() + 1
          }月${date.getDate()}日`;

          return (
            <li
              key={post.id}
              className="cursor-pointer"
              onClick={() => {
                setIsOpen(true);
                setSelectedPost(post);
              }}
            >
              <Card className="p-4">
                <CardHeader>
                  <CardDescription>{facebookPostDate}</CardDescription>
                  <CardTitle>
                    {post.full_picture && (
                      <div>
                        <img
                          className="object-cover mx-auto my-2"
                          src={post.full_picture}
                          alt="Facebook Post"
                        />
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-lg mb-4">
                  {post.message}
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>

      {isOpen && selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center z-50 mx-auto my-8 w-3/4">
          <div
            className="fixed inset-0 bg-black opacity-50 w-full h-full"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="relative bg-white m-auto p-10 rounded shadow-lg text-center w-full max-h-screen overflow-y-auto">
            <span className="text-lg my-8">
              {new Date(selectedPost.created_time).toDateString()}
            </span>
            <h2 className="text-lg mb-8">{selectedPost.message}</h2>

            {Array.isArray(imgUrls) && imgUrls.length > 0 && (
              <div className="flex justify-start">
                {imgUrls.map((imgurl, index) => (
                  <img
                    className="max-w-xs object-cover mx-auto mb-8"
                    key={index}
                    src={imgurl}
                    alt={`Image ${index}`}
                  />
                ))}
              </div>
            )}

            {typeof imgUrls === "string" && (
              <div>
                <img
                  className="max-w-xs object-cover mx-auto mb-8"
                  src={imgUrls}
                  alt="Facebook Post"
                />
              </div>
            )}

            <Button onClick={() => setIsOpen(false)} className="">
              閉じる
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPage;

// import { Button } from "@/app/components/shadcn/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/app/components/shadcn/ui/card";
// import type { FacebookPostType } from "@/app/type/facebookPostType";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const BlogPage = () => {
//   const [posts, setPosts] = useState<FacebookPostType[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedPost, setSelectedPost] = useState<FacebookPostType | null>(
//     null
//   );
//   // const [selectedPostImgUrls, setSelectedPostImgUrls] = useState<
//   //   string | string[] | undefined
//   // >(undefined);
//   let imgUrlArray: string | string[] | undefined = [];

//   useEffect(() => {
//     (async function () {
//       try {
//         const res = await axios.get("/circle/blog/api");
//         setPosts(res.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     })();
//   }, []);

//   return (
//     <>
//       <ul
//         className={`grid grid-cols-2 gap-4 ${
//           isOpen && selectedPost && "overflow-hidden"
//         }`}
//       >
//         {posts.map((post) => {
//           // イベント日を整形
//           const rawDate = post.created_time;
//           const date = new Date(rawDate);
//           const facebookPostDate = `${date.getFullYear()}年${
//             date.getMonth() + 1
//           }月${date.getDate()}日`;

//           // 画像URLを整形
//           if (
//             // 画像が複数の場合
//             post.attachments &&
//             post.attachments.data &&
//             post.attachments.data.length > 0 &&
//             post.attachments.data[0].subattachments
//           ) {
//             imgUrlArray = post.attachments.data[0].subattachments.data.map(
//               (subAttachment) => subAttachment.media.image.src
//             );
//           } else if (
//             // 画像が１枚の場合
//             post.attachments &&
//             post.attachments.data &&
//             post.attachments.data[0].media
//           ) {
//             imgUrlArray = [post.attachments.data[0].media.image.src];
//           }

//           return (
//             <li
//               key={post.id}
//               className="cursor-pointer"
//               onClick={() => {
//                 setIsOpen(true);
//                 setSelectedPost(post);
//                 // setSelectedPostImgUrls(
//                 //   (post.attachments?.data[0]?.subattachments?.data.map(
//                 //     (subAttachment) => subAttachment.media.image.src
//                 //   ) as string[]) || [
//                 //     post.attachments?.data[0]?.media?.image.src,
//                 //   ]
//                 // );
//               }}
//             >
//               <Card className="p-4">
//                 <CardHeader>
//                   <CardTitle>
//                     {Array.isArray(imgUrlArray) && imgUrlArray.length > 0 && (
//                       <div className="flex gap-2">
//                         {imgUrlArray.map((imgurl, index) => (
//                           <img
//                             className="max-w-xs object-cover mx-auto my-2"
//                             key={index}
//                             src={imgurl}
//                             alt={`Image ${index}`}
//                           />
//                         ))}
//                       </div>
//                     )}

//                     {typeof imgUrlArray === "string" && (
//                       <div>
//                         <img
//                           className="max-w-xs object-cover mx-auto my-2"
//                           src={imgUrlArray}
//                           alt="Facebook Post"
//                         />
//                       </div>
//                     )}
//                   </CardTitle>
//                   <CardDescription>{facebookPostDate}</CardDescription>
//                 </CardHeader>
//                 <CardContent>{post.message}</CardContent>
//               </Card>
//             </li>
//           );
//         })}
//       </ul>

//       {isOpen && selectedPost && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 mx-auto my-8 w-3/4 max-h-screen overflow-y-auto">
//           <div
//             className="fixed inset-0 bg-black opacity-50 w-screen h-screen"
//             onClick={() => {
//               setIsOpen(false);
//               console.log(selectedPost, imgUrlArray);
//             }}
//           ></div>

//           <div className="relative bg-white m-auto p-4 rounded shadow-lg text-center w-full">
//             <h2 className="text-2xl mb-4">{selectedPost.message}</h2>

//             {Array.isArray(imgUrlArray) && imgUrlArray.length > 0 && (
//               <div className="flex gap-2">
//                 {imgUrlArray.map((imgurl, index) => (
//                   <img
//                     className="max-w-xs object-cover mx-auto my-2"
//                     key={index}
//                     src={imgurl}
//                     alt={`Image ${index}`}
//                   />
//                 ))}
//               </div>
//             )}

//             {typeof imgUrlArray === "string" && (
//               <div>
//                 <img
//                   className="max-w-xs object-cover mx-auto my-2"
//                   src={imgUrlArray}
//                   alt="Facebook Post"
//                 />
//               </div>
//             )}

//             <Button onClick={() => setIsOpen(false)} className="">
//               閉じる
//             </Button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
// export default BlogPage;
