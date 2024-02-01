"use client";
import { useToast } from "@/app/components/shadcn/ui/use-toast";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

const SuccessPage: FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/user/mypage/");
    }, 3000);

    toast({
      title: "参加申込みを完了しました",
      description: "申込み内容に間違いがないか再度ご確認ください。",
    });

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="container min-h-[200px] flex flex-col justify-center flex-grow">
      <h1>お支払いが完了しました！</h1>
      <p>ご利用いただきありがとうございます。</p>
    </div>
  );
};

export default SuccessPage;
