import useAuthCurrentUser from "@/app/components/auth/useAuthCurrentUser";
import useUserRole from "@/app/components/auth/useUserRole";
import { postType } from "@/app/type/postType";
import { Button } from "../../../../components/shadcn/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/shadcn/ui/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "../../../../components/shadcn/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../components/shadcn/ui/tooltip";
import { useTimestampGetter } from "../useTimestampGetter";
import AfterPayTab from "./AfterPayTab";
import BeforePayTab from "./BeforePayTab";

type ApplicationDialogProps = {
  post: postType;
  id: string;
};

export default function ApplicationDialog({
  post,
  id,
}: ApplicationDialogProps) {
  const { formatTimestampWithWeekday } = useTimestampGetter();
  const user = useAuthCurrentUser();
  const userRole = useUserRole(user ? user.uid : null);

  return (
    <>
      {userRole === "member" && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">申込む</Button>
          </DialogTrigger>
          <DialogContent className="w-auto min-w-[350px] max-w-xl max-h-screen my-5">
            <div className="overflow-y-auto max-h-screen">
              <DialogHeader className="text-lg mb-10">
                <DialogTitle className="text-base tracking-wide">
                  申込み日程：
                  <span className="text-2xl">
                    {post.eventDate &&
                      `${formatTimestampWithWeekday(post.eventDate)}`}
                  </span>
                </DialogTitle>
              </DialogHeader>
              {/* 予約タブ */}
              <Tabs defaultValue="post-payment" className="w-full ">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <TabsTrigger value="post-payment" className="w-full ">
                          本予約
                        </TabsTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>決済をして申込む</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <TabsTrigger value="after-payment" className="w-full">
                          仮予約
                        </TabsTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>事前に席だけ申込み、当日支払う</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TabsList>

                {/* 本予約 */}
                <BeforePayTab id={id} />

                {/* 仮予約 */}
                <AfterPayTab id={id} />
              </Tabs>
              <DialogClose asChild></DialogClose>
              <DialogFooter></DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
