import { Card } from "@/app/components/shadcn/ui/card";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTimestampFormatter } from "../../circle/schedule/useTimestampFormatter";
import { useTimestampGetter } from "../../circle/schedule/useTimestampGetter";

type DocType = {
  eventDate: Timestamp;
  userId: string;
  userName: string;
  applyDate: Timestamp;
  isPaid: boolean;
};

const Reservation = () => {
  const [applications, setApplications] = useState<DocType[]>([]);
  const router = useRouter();
  const { formatTimestamp } = useTimestampFormatter();
  const { formatTimestampWithWeekday } = useTimestampGetter();

  async function getFirebaseAccessToken() {
    const firebaseAuth = getAuth();
    onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        console.log("User is signed out");
        // await firebaseAuth.signInWithEmailAndPassword(email, password);
        router.push("/");
        router.refresh();
      }
    });
    const user = firebaseAuth.currentUser;

    if (!user) {
      // ログインの処理などを実装
      throw new Error("User not authenticated");
    }
    const accessToken = await user.getIdToken();
    return accessToken;
  }

  useEffect(() => {
    let isMounted = true;

    const fetchApplications = async () => {
      const accessToken = await getFirebaseAccessToken();
      const response = await fetch("/user/mypage/api/", {
        // fetchリクエストにAuthorizationヘッダーを含めて送信
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const res = await response.json();

      // ドキュメントのデータを取得
      const applicationsData: DocType[] = res.applicationsArray.map(
        (applicationData: DocType) => ({
          eventDate: applicationData.eventDate,
          userId: applicationData.userId,
          userName: applicationData.userName,
          applyDate: applicationData.applyDate,
          isPaid: applicationData.isPaid,
        })
      );
      setApplications(applicationsData);
    };

    if (isMounted) {
      fetchApplications();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  console.log(applications);
  return (
    <>
      {applications.length > 0 ? (
        applications.map((application, index) => (
          <Card key={index} className="m-5 p-5">
            <p>
              申込み日程：
              {application.eventDate && //ToDo:Invalid Dateを解消する
                `${new Date(
                  application.eventDate.seconds * 1000
                ).toLocaleString()}`}
              ・
              {application.eventDate &&
                `${formatTimestampWithWeekday(application.eventDate)}`}
            </p>
            <p>申込み者名：{application.userName}</p>
            <p>
              申込み完了日：
              {application.applyDate && //ToDo:Invalid Dateを解消する
                `${new Date(
                  application.applyDate.seconds * 1000
                ).toLocaleString()}`}
              ・
              {application.applyDate &&
                `${formatTimestampWithWeekday(application.applyDate)}`}
            </p>
            <p>
              お支払い状況：
              {application.isPaid ? "決済済み" : "当日支払い"}
            </p>
          </Card>
        ))
      ) : (
        <p>申込み予約はありません</p>
      )}
    </>
  );
};

export default Reservation;
