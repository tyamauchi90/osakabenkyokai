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
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { WhileInListsVariants } from "../../variants";

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
  }, [imgUrls, selectedPost]);

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

      <div className="container my-12">
        <h2 className="text-center text-2xl sm:text-4xl mb-12 tracking-widest">
          ブログ一覧
        </h2>
        <motion.ul
          className={`max-w-[1400px] w-[90vw] mx-auto space-y-12 ${
            selectedPost && "overflow-hidden"
          }`}
          ref={ref}
          variants={WhileInListsVariants}
          initial="start"
          animate={controls}
        >
          {posts?.slice(0, loadIndex).map((post) => {
            let limitedMessage: React.ReactNode | string = "";

            if (post.message) {
              limitedMessage =
                post.message.length > 100 ? (
                  <>
                    {post.message.slice(0, 200)}
                    <span> ...... </span>
                    <span className="text-sm text-gray-400">
                      （続きを読む）
                    </span>
                  </>
                ) : (
                  post.message.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))
                );
            }

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
                    <Card className="lg:flex lg:items-start w-full py-[5vh] text-center break-words">
                      <CardHeader className="pt-0 px-0 lg:py-0 lg:px-6">
                        <div className="lg:w-[30vw] mx-auto">
                          {post.full_picture && (
                            <div className="relative w-[50vw] lg:w-[30vw] h-[50vw] lg:h-[30vw]">
                              <Image
                                fill
                                placeholder="empty"
                                className="object-cover"
                                src={post.full_picture}
                                alt={`Facebook Post${post.formattedDate}`}
                              />
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="py-0 lg:w-[50vw] lg:flex-1 text-lg mb-4">
                        <CardTitle>
                          <CardDescription>
                            {post.formattedDate}
                          </CardDescription>
                        </CardTitle>
                        <span className="lg:hidden">{limitedMessage}</span>
                        <span className="hidden lg:block">{post.message}</span>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="m-auto max-w-[90vw] max-h-[90vh] overflow-y-scroll break-words">
                    <div className="w-[76vw] mx-auto my-[5vh]">
                      <DialogHeader className="flex flex-col justify-center items-center">
                        {selectedPost &&
                          Array.isArray(selectedPost.imgUrls) &&
                          selectedPost.imgUrls.length > 0 && (
                            <ScrollArea className="w-[85vw] whitespace-nowrap">
                              <div className="flex justify-center gap-4">
                                {selectedPost.imgUrls.map((imgurl) => (
                                  <div
                                    key={selectedPost.id}
                                    className="relative w-[50vw] lg:w-[30vw] h-[50vw] lg:h-[30vw]"
                                  >
                                    <Image
                                      fill
                                      placeholder="empty"
                                      className="object-cover mx-auto mb-8"
                                      src={imgurl}
                                      alt={`Image ${selectedPost.created_time}`}
                                    />
                                  </div>
                                ))}
                              </div>
                              <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                          )}
                      </DialogHeader>
                      <DialogTitle className="text-center text-lg">
                        {selectedPost && selectedPost.formattedDate}
                      </DialogTitle>
                      <DialogDescription className="text-center text-lg break-words mb-8">
                        {selectedPost && selectedPost.message}
                      </DialogDescription>

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
      </div>
    </>
  );
};

export default BlogPage;
