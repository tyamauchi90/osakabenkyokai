"use client";
import { useToast } from "@/app/components/shadcn/ui/use-toast";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

const CancelPage: FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/user/mypage/");
    }, 3000);

    toast({
      title: "参加申込みに失敗しました",
      description: "再度お試しください。",
    });

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="container min-h-[300px] flex flex-col justify-center flex-grow">
      <h1>お支払いがキャンセルされました。</h1>
      <p>何か問題が発生したようです。もう一度お試しください。</p>
    </div>
  );
};

export default CancelPage;
