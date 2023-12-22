"use client";
import { WhileInEventLists } from "@/app/components/WhileInEventLists";
import useAuthCurrentUser from "@/app/components/auth/useAuthCurrentUser";
import useUserRole from "@/app/components/auth/useUserRole";
import { Button } from "@/app/components/shadcn/ui/button";
import Link from "next/link";
import { Suspense } from "react";

const SchedulePage = () => {
  const user = useAuthCurrentUser();
  const userRole = useUserRole(user ? user.uid : null);
  return (
    <>
      <div className="container flex flex-col items-center w-full">
        <h2 className="text-5xl py-7">スケジュール一覧</h2>

        {userRole === "admin" ||
          (userRole === "maseter" && (
            <Link href="/circle/schedule/new">
              <Button>記事を書く</Button>
            </Link>
          ))}

        <Suspense
          fallback={<p className="mt-4">最新スケジュール　Loading...</p>}
        >
          <WhileInEventLists />
        </Suspense>
      </div>
    </>
  );
};

export default SchedulePage;
