import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type DocType = {
  eventDate: Timestamp;
  userId: string;
  userName: string;
  applyDate: Timestamp;
  isPaid: boolean;
};

export const useFetchAllReservations = () => {
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
          const response = await fetch("/admin/api/", {
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

          const applicationsData: DocType[] = res.applicationsArray.map(
            (applicationData: DocType) => ({
              eventDate: applicationData.eventDate,
              userId: applicationData.userId,
              userName: applicationData.userName,
              applyDate: applicationData.applyDate,
              isPaid: applicationData.isPaid,
            })
          );

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
