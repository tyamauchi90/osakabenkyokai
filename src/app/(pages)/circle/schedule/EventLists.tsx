"use client";
import { LoadingSkelton } from "@/app/components/ui/LoadingSkelton";
import useAllPosts from "@/app/swr/useAllPosts";
import { postType } from "@/app/type/postType";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/shadcn/ui/card";
import { useTimestampFormatter } from "./useTimestampFormatter";

function EventLists() {
  const { data: posts, error, isLoading } = useAllPosts();

  const { formatTimestamp } = useTimestampFormatter();

  return (
    <div>
      <ul>
        {error && <div>Error loading data</div>}
        {isLoading && (
          <div className="m-5">
            <p>Loading・・・</p>
            <LoadingSkelton />
          </div>
        )}
        {posts &&
          posts.map((post: postType) => {
            let limitedContent: React.ReactNode | string = "";

            if (post.content) {
              limitedContent =
                post.content.length > 100 ? (
                  <>
                    {post.content.slice(0, 100)}
                    <span> ...... </span>
                    <span className="text-sm text-gray-400">
                      （続きを読む）
                    </span>
                  </>
                ) : (
                  post.content.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))
                );
            }

            return (
              <li key={post.id} className="w-fll m-10">
                
                <Link href={`/circle/schedule/${post.id}`}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>
                        イベント日:
                        {post.eventDate ? formatTimestamp(post.eventDate) : ""}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="whitespace-pre-line">
                      {limitedContent}
                    </CardContent>
                  </Card>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default EventLists;

// "use client";
// import { postType } from "@/app/type/postType";
// import axios from "axios";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../../../components/shadcn/ui/card";
// import { useTimestampFormatter } from "./useTimestampFormatter";

// function EventLists() {
//   const [posts, setPosts] = useState<postType[]>([]);
//   const { formatTimestamp } = useTimestampFormatter();
//   // const posts = useBlogList();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("/circle/schedule/api");
//         setPosts(res.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {/* <h1>記事一覧</h1> */}
//       <ul>
//         {posts.map((post) => {
//           // 投稿内容を100文字に制限
//           let limitedContent: string = ""; // 初期値を設定

//           if (post.content) {
//             limitedContent =
//               post.content.length > 100
//                 ? post.content.slice(0, 100) + `<span> ...... </span>`
//                 : post.content;
//           }

//           return (
//             <li key={post.id} className="w-fll m-10">
//               <Link href={`/circle/schedule/${post.id}`}>
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>{post.title}</CardTitle>
//                     <CardDescription>
//                       イベント日:
//                       {post.eventDate ? formatTimestamp(post.eventDate) : ""}
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     {/* <p>{limitedContent}</p> */}
//                     <span
//                       dangerouslySetInnerHTML={{ __html: limitedContent }}
//                     />
//                     <span className="text-sm text-gray-400">
//                       （続きを読む）
//                     </span>
//                   </CardContent>
//                 </Card>
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// export default EventLists;
