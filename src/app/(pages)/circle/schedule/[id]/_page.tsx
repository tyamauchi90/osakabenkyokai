// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/app/components/shadcn/ui/card";
// import { postType } from "@/app/type/postType";
// import React from "react";
// import getPostById from "../getPostById";

// type PageProps = {
//   params: {
//     postId: string;
//   };
// };

// const PostDetailPage = async ({ params }: PageProps) => {
//   const { postId } = params;
//   console.log(postId, params);

//   // 投稿詳細を取得
//   const post: postType | null = await getPostById({ postId });

//   // 投稿がない場合
//   if (!post) {
//     return <div className="text-center">投稿はありません</div>;
//   }

//   // 改行を反映させる関数
//   const renderWithLineBreaks = (firestoreData: string | undefined) => (
//     <p>
//       {firestoreData?.split("\n").map((line, index) => (
//         <React.Fragment key={index}>
//           {line}
//           <br />
//         </React.Fragment>
//       ))}
//     </p>
//   );

//   return (
//     <div className="my-10">
//       <Card>
//         <CardHeader>
//           <CardTitle>{post.title}</CardTitle>
//           <CardDescription>
//             イベント日: {post.eventDate?.toDate().toLocaleDateString()}
//           </CardDescription>
//         </CardHeader>
//         <CardContent>{renderWithLineBreaks(post.content)}</CardContent>
//       </Card>
//     </div>
//   );
// };

// export default PostDetailPage;
