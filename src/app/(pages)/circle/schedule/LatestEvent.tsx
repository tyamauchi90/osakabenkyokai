// "use client";
import { LoadingSkelton } from "@/app/components/ui/LoadingSkelton";
import useLatestPost from "@/app/swr/useLatestPost";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/shadcn/ui/card";
import ApplicationDialog from "./[id]/ApplicationDialog";
import { useTimestampGetter } from "./useTimestampGetter";

function LatestEvent() {
  const { data: latestPost, error, isLoading, mutate } = useLatestPost();

  const { formatTimestampWithWeekday } = useTimestampGetter();

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
        <Card className="flex flex-col items-center m-10">
          <CardHeader className="pb-0">
            <CardTitle className="font-normal tracking-wide">
              {latestPost.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center text-4xl tracking-wider">
            <img
              className="w-[200px] h-[200px] -m-4"
              src="./img/top/805.png"
              alt="日程"
            />
            <div className="flex flex-col items-center">
              <p className="border-b-4 border-customYellow pb-2 mb-4">
                {latestPost.eventDate
                  ? `${formatTimestampWithWeekday(latestPost.eventDate)}`
                  : ""}
              </p>

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
                  ? formatTimestamp(latestPost.eventDate)
                  : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="whitespace-pre-line">
              {latestPost.content}
            </CardContent>
          </Card>
        </Link> */
}
