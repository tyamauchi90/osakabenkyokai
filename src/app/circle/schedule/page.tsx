import EventLists from "@/app/circle/schedule/EventLists";
import { Button } from "@/app/components/shadcn/ui/button";
import Link from "next/link";
import { Suspense } from "react";

const SchedulePage = () => {
  return (
    <div>
      <h1>SchedulePage</h1>
      <br />
      <Link href="/circle/schedule/new">
        <Button>記事を書く</Button>
      </Link>
      <br />
      <br />
      <Suspense fallback={<p className="mt-4">最新スケジュール　Loading...</p>}>
        <EventLists />
      </Suspense>
    </div>
  );
};

export default SchedulePage;
