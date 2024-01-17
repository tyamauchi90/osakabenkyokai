import { Button } from "@/app/components/shadcn/ui/button";
import { Card } from "@/app/components/shadcn/ui/card";
import { useToast } from "@/app/components/shadcn/ui/use-toast";
import { TimestampType } from "@/app/type/TimestampType";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTimestampFormatter } from "../../circle/schedule/useTimestampFormatter";
import { useFetchMyReservation } from "./useFetchMyReservation";

const Reservation = () => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  // const user = useAuthCurrentUser();
  const applications = useFetchMyReservation();
  const { getMonthAndDayAndWeekday } = useTimestampFormatter();
  const router = useRouter();
  const { toast } = useToast();

  const handleCancel = async (postId: string, userId: string) => {
    setLoadingId(postId);

    try {
      let overwrite = false;
      overwrite = confirm("すでに予約されています。キャンセルしますか？"); // ToDo:alert Dialogの使用を検討
      if (!overwrite) {
        setLoadingId(null);
        router.push(`/user/mypage/`);
        return;
      }

      const res = await fetch("/user/mypage/api/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          userId,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text(); // エラーの詳細を取得
        console.error(
          `サーバーからの応答が正常ではありません。エラー内容: ${errorText}`
        );
        throw new Error("サーバーからの応答が正常ではありません。");
      }

      setLoadingId(null);
      router.push("/user/mypage/");
      toast({
        title: "参加申込みをキャンセルしました",
        description: "キャンセル内容に間違いがないか再度ご確認ください。",
      });
    } catch (error: any) {
      console.error("参加申込みキャンセル中にエラーが発生しました: ", error);
      alert(`サーバーエラー: ${error?.message}`);
    }
  };
  return (
    <>
      {applications.length > 0 ? (
        applications.map((application, index) => {
          const date =
            application && application.eventDate
              ? new Date(
                  ((application.eventDate as unknown as TimestampType)
                    ._seconds || application.eventDate.seconds) * 1000
                )
              : undefined;
          const canCancel = date && date > new Date();

          return (
            <Card
              key={index}
              className={`w-full max-w-sm p-5 space-y-4 shadow-md ${
                !canCancel &&
                "text-gray-500 bg-black bg-opacity-20 pointer-events-none"
              }`}
            >
              <p className="text-lg">
                <span className="text-xs">申込日程：</span>
                {application.eventDate &&
                  `${getMonthAndDayAndWeekday(application.eventDate)}`}
              </p>
              <p className="text-lg">
                <span className="text-xs">申込者名：</span>
                {application.userName}
              </p>
              <p className="text-lg">
                <span className="text-xs">申込完了日：</span>
                {application.applyDate &&
                  `${getMonthAndDayAndWeekday(application.applyDate)}`}
              </p>
              <p className="text-lg">
                <span className="text-xs">お支払状況：</span>
                {application.isPaid ? "決済済み" : "当日支払い"}
              </p>

              {/* キャンセルボタン */}
              <div className="flex items-center justify-center border-t pt-4">
                <Button
                  variant={canCancel ? "default" : "ghost"}
                  onClick={() =>
                    handleCancel(application.postId, application.userId)
                  }
                  key={index}
                  className={`w-28 ${
                    (loadingId === application.postId &&
                      "opacity-50 cursor-not-allowed") ||
                    ""
                  }`}
                >
                  {loadingId === application.postId ? (
                    <div className="animate-spin rounded-full border-t-2 border-r-2 border-b-2 border-white h-6 w-6"></div>
                  ) : canCancel ? (
                    "キャンセル"
                  ) : (
                    "終了"
                  )}
                </Button>
              </div>
            </Card>
          );
        })
      ) : (
        <p>申込み予約はありません</p>
      )}
    </>
  );
};

export default Reservation;
