"use client";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useTimestampFormatter } from "../(pages)/circle/schedule/useTimestampFormatter";
import { WhileInListsVariants } from "../(pages)/variants";
import useAllPosts from "../swr/useAllPosts";
import { postType } from "../type/postType";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./shadcn/ui/card";
import { LoadingSkelton } from "./ui/LoadingSkelton";

type PropsType = {
  className?: string;
};

export const WhileInEventLists = ({ className }: PropsType) => {
  const controls = useAnimation();
  const { ref, inView } = useInView();
  const { getMonthAndDayAndWeekday } = useTimestampFormatter();
  const { data: posts, error, isLoading } = useAllPosts();

  useEffect(() => {
    if (inView) {
      controls.start("enter");
    }
  }, [controls, inView]);

  return (
    <>
      <div className="container">
        {error && <div>Error loading data</div>}
        {isLoading && (
          <div className="w-full h-screen sm:m-7">
            <p>Loading・・・</p>
            <LoadingSkelton />
          </div>
        )}
        <motion.ul
          className={`space-y-12 ${className}`}
          ref={ref}
          variants={WhileInListsVariants}
          initial="start"
          animate={controls}
        >
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
                <motion.li
                  key={post.id}
                  className="w-fll"
                  variants={WhileInListsVariants}
                >
                  <Link href={`/circle/schedule/${post.id}`}>
                    <Card>
                      <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription>
                          イベント日:
                          {post.eventDate
                            ? getMonthAndDayAndWeekday(post.eventDate)
                            : ""}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="whitespace-pre-line">
                        {limitedContent}
                      </CardContent>
                    </Card>
                  </Link>
                </motion.li>
              );
            })}
        </motion.ul>
      </div>
    </>
  );
};
