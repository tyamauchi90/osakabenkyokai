import { TimestampType } from "@/app/type/TimestampType";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type DocType = {
  postId: string;
  eventDate: Timestamp;
  userId: string;
  userName: string;
  applyDate: Timestamp;
  isPaid: boolean;
};

export const useFetchMyReservation = () => {
  const [applications, setApplications] = useState<DocType[]>([]);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const fetchApplications = async () => {
      const firebaseAuth = getAuth();

      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        if (!user) {
          console.log("ユーザーがログアウトしています");
          // ユーザーが認証されていない場合はログインページにリダイレクト
          router.push("/");
          router.refresh();
        } else {
          // ユーザーが認証されている場合、データの取得を続行
          const accessToken = await user.getIdToken();
          const response = await fetch("/user/mypage/api/", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!response.ok) {
            throw new Error(
              `ネットワークの応答が正しくありませんでした：${response.statusText}`
            );
          }

          const res = await response.json();

          const applicationsData: DocType[] = res.applicationsArray
            .map((applicationData: DocType) => ({
              postId: applicationData.postId,
              eventDate: applicationData.eventDate,
              userId: applicationData.userId,
              userName: applicationData.userName,
              applyDate: applicationData.applyDate,
              isPaid: applicationData.isPaid,
            }))
            .sort((a: DocType, b: DocType) => {
              const dateA = new Date(
                (a.eventDate as unknown as TimestampType)._seconds * 1000
              );
              const dateB = new Date(
                (b.eventDate as unknown as TimestampType)._seconds * 1000
              );

              return dateB.getTime() - dateA.getTime();
            });

          if (isMounted) {
            setApplications(applicationsData);
          }
        }
      });

      return () => {
        unsubscribe();
        isMounted = false;
      };
    };

    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return applications;
};
