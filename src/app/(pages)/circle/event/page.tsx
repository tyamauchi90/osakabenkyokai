"use client";
import { WhileInEventLists } from "@/app/components/WhileInEventLists";
import useAuthCurrentUser from "@/app/components/auth/useAuthCurrentUser";
import useUserRole from "@/app/components/auth/useUserRole";
import { Button } from "@/app/components/shadcn/ui/button";
import Link from "next/link";
import { Suspense } from "react";

const EventPage = () => {
  const user = useAuthCurrentUser();
  const userRole = useUserRole(user ? user.uid : null);
  return (
    <>
      <div className="container flex flex-col items-center w-full gap-12 my-12">
        <h2 className="text-2xl sm:text-4xl">イベント一覧</h2>

        {(userRole === "admin" || userRole === "maseter") && (
          <Link href="/circle/event/new">
            <Button>記事を書く</Button>
          </Link>
        )}

        <Suspense
          fallback={
            <p className="w-full h-screen mt-4">最新イベント　Loading...</p>
          }
        >
          <WhileInEventLists />
        </Suspense>
      </div>
    </>
  );
};

export default EventPage;
