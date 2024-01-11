"use client";
import { Button } from "@/app/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/shadcn/ui/card";
import { LoadingSkelton } from "@/app/components/ui/LoadingSkelton";
import type { FacebookPostType } from "@/app/type/facebookPostType";
import { WhileInListsVariants } from "@/app/variants";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

type PropsType = {
  className?: string;
};

const Test = ({ className }: PropsType) => {
  const { data, isLoading } = useSWR(`/test/api`, fetcher, {
    fallbackData: { posts: [], paging: [] },
    revalidateOnMount: true,
    suspense: true,
  });
  const { posts = [], paging = [] } = data || {};
  const [loadIndex, setLoadIndex] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<FacebookPostType | null>(
    null
  );
  const [imgUrls, setImgUrls] = useState<string | string[] | undefined>(
    undefined
  );
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

      <motion.ul
        className={`${className} grid grid-cols-2 gap-4 ${
          isOpen && selectedPost && "overflow-hidden"
        }`}
        ref={ref}
        variants={WhileInListsVariants}
        initial="start"
        animate={controls}
      >
        {posts?.slice(0, loadIndex).map((post: FacebookPostType) => {
          // イベント日を整形
          const rawDate = post.created_time;
          const date = new Date(rawDate);
          const facebookPostDate = `${date.getFullYear()}年${
            date.getMonth() + 1
          }月${date.getDate()}日`;

          return (
            <motion.li
              key={post.id}
              className="cursor-pointer"
              onClick={() => {
                setIsOpen(true);
                setSelectedPost(post);
              }}
            >
              <Card className="p-4 break-words">
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
            </motion.li>
          );
        })}
      </motion.ul>

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
              <div className="flex justify-start overflow-x-auto">
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

export default Test;
