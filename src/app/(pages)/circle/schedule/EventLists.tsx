"use client";
import { LoadingSkelton } from "@/app/components/ui/LoadingSkelton";
import useAllPosts from "@/app/swr/useAllPosts";
import { postType } from "@/app/type/postType";
import Link from "next/link";
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

  const { getMonthAndDayAndWeekday } = useTimestampFormatter();

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
            // let limitedContent: React.ReactNode | string = "";

            // if (post.content) {
            //   limitedContent =
            //     post.content.length > 100 ? (
            //       <>
            //         {post.content.slice(0, 100)}
            //         <span> ...... </span>
            //         <span className="text-sm text-gray-400">
            //           （続きを読む）
            //         </span>
            //       </>
            //     ) : (
            //       post.content.split("\n").map((line, index) => (
            //         <React.Fragment key={index}>
            //           {line}
            //           <br />
            //         </React.Fragment>
            //       ))
            //     );
            // }

            return (
              <li key={post.id} className="w-fll m-10">
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
                      {/* {limitedContent} */}
                      {post.content}
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
