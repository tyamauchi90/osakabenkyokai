"use client";
import { LoadingSkelton } from "@/app/components/ui/LoadingSkelton";
import useLatestPost from "@/app/swr/useLatestPost";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/shadcn/ui/card";
import ApplicationDialog from "./[id]/ApplicationDialog";
import { useTimestampFormatter } from "./useTimestampFormatter";

type PropsType = {
  className?: string;
};

function LatestEvent({ className }: PropsType) {
  const { data: latestPost, error, isLoading, mutate } = useLatestPost();

  const { getMonthAndDayAndWeekday } = useTimestampFormatter();

  return (
    <div>
      {error && <div>Error loading data</div>}
      {isLoading && (
        <div className="m-5">
          <p>Loading・・・</p>
          <LoadingSkelton />
        </div>
      )}
      {latestPost && (
        <Card
          className={`max-w-[375px] flex flex-col items-center ${className}`}
        >
          <CardHeader className="pb-8">
            <CardTitle className="font-normal tracking-wide">
              {latestPost.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-4xl tracking-wider">
            <p className="border-b-4 border-customYellow pb-2 mb-4">
              {latestPost.eventDate
                ? `${getMonthAndDayAndWeekday(latestPost.eventDate)}`
                : ""}
            </p>
            <div className="flex justify-center items-center">
              <div className="relative w-[180px] h-[180px] -m-8 -mr-4">
                <Image
                  fill
                  placeholder="empty"
                  src="/img/top/805.png"
                  alt="日程"
                />
              </div>

              {/* 申込みボタン */}
              <ApplicationDialog post={latestPost} id={latestPost.id} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default LatestEvent;

{
  /* <Link href={`/circle/schedule/${latestPost.id}`}>
          <Card className="m-10">
            <CardHeader>
              <CardTitle>{latestPost.title}</CardTitle>
              <CardDescription>
                イベント日:
                {latestPost.eventDate
                  ? getMonthAndDayAndWeekday(latestPost.eventDate)
                  : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="whitespace-pre-line">
              {latestPost.content}
            </CardContent>
          </Card>
        </Link> */
}
