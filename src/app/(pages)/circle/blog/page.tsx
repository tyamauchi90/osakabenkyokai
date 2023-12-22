"use client";
import { Button } from "@/app/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/shadcn/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/shadcn/ui/dialog";
import { ScrollArea, ScrollBar } from "@/app/components/shadcn/ui/scroll-area";
import { LoadingSkelton } from "@/app/components/ui/LoadingSkelton";
import useAllFacebookPosts from "@/app/swr/useAllFacebookPosts";
import type { SelectedFacebookPostType } from "@/app/type/facebookPostType";
import { WhileInListsVariants } from "@/app/variants";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const BlogPage = () => {
  const { data: posts, error, isLoading } = useAllFacebookPosts();

  const [imgUrls, setImgUrls] = useState<string | string[] | undefined>(
    undefined
  );
  const [selectedPost, setSelectedPost] =
    useState<SelectedFacebookPostType | null>(null);
  const [loadIndex, setLoadIndex] = useState(5);
  const [isActive, setIsActive] = useState(true);
  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("enter");
    }
  }, [controls, inView]);

  useEffect(() => {
    const updateImageUrls = () => {
      if (selectedPost) {
        setImgUrls(imgUrls);
      }
    };

    updateImageUrls();
  }, [selectedPost]);

  const handleLoadMore = () => {
    if (loadIndex + 5 >= posts.length) {
      setIsActive(false);
    }
    if (loadIndex < posts.length) {
      setLoadIndex(loadIndex + 5);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="w-full h-screen">
          <LoadingSkelton />
        </div>
      )}
      {error && (
        <div className="w-full h-screen">
          データ取得に失敗しました。もう一度やり直してください。
        </div>
      )}

      <motion.ul
        className={`grid grid-cols-2 gap-4 ${
          selectedPost && "overflow-hidden"
        }`}
        ref={ref}
        variants={WhileInListsVariants}
        initial="start"
        animate={controls}
      >
        {posts?.slice(0, loadIndex).map((post) => {
          return (
            <motion.li
              key={post.id}
              className="cursor-pointer"
              onClick={() => {
                setSelectedPost(post);
              }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="p-4 break-words">
                    <CardHeader>
                      <CardDescription>{post.formattedDate}</CardDescription>
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
                </DialogTrigger>
                <DialogContent className="m-auto p-7 max-w-[90vw] max-h-[90vh] overflow-y-auto">
                  <div className="w-[80vw]">
                    <DialogHeader>
                      <DialogTitle className="text-center text-lg">
                        {selectedPost && selectedPost.formattedDate}
                      </DialogTitle>
                    </DialogHeader>
                    {selectedPost && (
                      <DialogDescription className="text-center ">
                        <h2 className="text-lg break-words mb-8">
                          {selectedPost.message}
                        </h2>

                        {Array.isArray(selectedPost.imgUrls) &&
                          selectedPost.imgUrls.length > 0 && (
                            <ScrollArea className="w-full whitespace-nowrap">
                              <div className="flex justify-center">
                                {selectedPost.imgUrls.map((imgurl, index) => (
                                  <img
                                    className="max-w-xs object-cover mx-auto mb-8"
                                    key={index}
                                    src={imgurl}
                                    alt={`Image ${index}`}
                                  />
                                ))}
                              </div>
                              <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                          )}

                        {/* {typeof imgUrls === "string" && (
                          <div>
                            <img
                              className="object-cover mx-auto mb-8"
                              src={imgUrls}
                              alt="Facebook Post"
                            />
                          </div>
                        )} */}
                      </DialogDescription>
                    )}
                    <DialogFooter className="sm:justify-center">
                      <DialogClose asChild>
                        <Button className="">閉じる</Button>
                      </DialogClose>
                    </DialogFooter>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.li>
          );
        })}
      </motion.ul>

      <div className="flex justify-center my-4">
        <Button
          variant="ghost"
          onClick={handleLoadMore}
          className="text-gray-400"
          disabled={!isActive}
        >
          さらに表示
        </Button>
      </div>
    </>
  );
};

export default BlogPage;

// "use client";
// import { Button } from "@/app/components/shadcn/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/app/components/shadcn/ui/card";
// import { LoadingSkelton } from "@/app/components/ui/LoadingSkelton";
// import useAllFacebookPosts from "@/app/swr/useAllFacebookPosts";
// import type { SelectedFacebookPostType } from "@/app/type/facebookPostType";
// import { WhileInListsVariants } from "@/app/variants";
// import { motion, useAnimation } from "framer-motion";
// import { useEffect, useState } from "react";
// import { useInView } from "react-intersection-observer";

// const BlogPage = () => {
//   const { data: posts, error, isLoading } = useAllFacebookPosts();

//   const [isOpen, setIsOpen] = useState(false);
//   const [imgUrls, setImgUrls] = useState<string | string[] | undefined>(
//     undefined
//   );
//   const [selectedPost, setSelectedPost] =
//     useState<SelectedFacebookPostType | null>(null);
//   const [loadIndex, setLoadIndex] = useState(5);
//   const [isActive, setIsActive] = useState(true);
//   const controls = useAnimation();
//   const { ref, inView } = useInView();

//   useEffect(() => {
//     if (inView) {
//       controls.start("enter");
//     }
//   }, [controls, inView]);

//   useEffect(() => {
//     const updateImageUrls = () => {
//       if (selectedPost) {
//         setImgUrls(imgUrls);
//       }
//     };

//     updateImageUrls();
//   }, [selectedPost]);

//   const handleLoadMore = () => {
//     if (loadIndex + 5 >= posts.length) {
//       setIsActive(false);
//     }
//     if (loadIndex < posts.length) {
//       setLoadIndex(loadIndex + 5);
//     }
//   };

//   return (
//     <>
//       {isLoading && (
//         <div className="w-full h-screen">
//           <LoadingSkelton />
//         </div>
//       )}
//       {error && (
//         <div className="w-full h-screen">
//           データ取得に失敗しました。もう一度やり直してください。
//         </div>
//       )}

//       <motion.ul
//         className={`grid grid-cols-2 gap-4 ${
//           isOpen && selectedPost && "overflow-hidden"
//         }`}
//         ref={ref}
//         variants={WhileInListsVariants}
//         initial="start"
//         animate={controls}
//       >
//         {posts?.slice(0, loadIndex).map((post) => {
//           return (
//             <motion.li
//               key={post.id}
//               className="cursor-pointer"
//               onClick={() => {
//                 setIsOpen(true);
//                 setSelectedPost(post);
//               }}
//             >
//               <Card className="p-4 break-words">
//                 <CardHeader>
//                   <CardDescription>{post.formattedDate}</CardDescription>
//                   <CardTitle>
//                     {post.full_picture && (
//                       <div>
//                         <img
//                           className="object-cover mx-auto my-2"
//                           src={post.full_picture}
//                           alt="Facebook Post"
//                         />
//                       </div>
//                     )}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="text-lg mb-4">
//                   {post.message}
//                 </CardContent>
//               </Card>
//             </motion.li>
//           );
//         })}
//       </motion.ul>

//       {isOpen && selectedPost && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 mx-auto my-8 w-3/4">
//           <div
//             className="fixed inset-0 bg-black opacity-50 w-full h-full"
//             onClick={() => setIsOpen(false)}
//           ></div>

//           <div className="relative bg-white m-auto p-10 rounded shadow-lg text-center w-full max-h-screen overflow-y-auto">
//             <span className="text-lg my-8">{selectedPost.formattedDate}</span>
//             <h2 className="text-lg mb-8">{selectedPost.message}</h2>
//             {Array.isArray(selectedPost.imgUrls) &&
//               selectedPost.imgUrls.length > 0 && (
//                 <div className="flex justify-start">
//                   {selectedPost.imgUrls.map((imgurl, index) => (
//                     <img
//                       className="max-w-xs object-cover mx-auto mb-8"
//                       key={index}
//                       src={imgurl}
//                       alt={`Image ${index}`}
//                     />
//                   ))}
//                 </div>
//               )}

//             {typeof imgUrls === "string" && (
//               <div>
//                 <img
//                   className="max-w-xs object-cover mx-auto mb-8"
//                   src={imgUrls}
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

//       <div className="flex justify-center my-4">
//         <Button
//           variant="ghost"
//           onClick={handleLoadMore}
//           className="text-gray-400"
//           disabled={!isActive}
//         >
//           さらに表示
//         </Button>
//       </div>
//     </>
//   );
// };

// export default BlogPage;
