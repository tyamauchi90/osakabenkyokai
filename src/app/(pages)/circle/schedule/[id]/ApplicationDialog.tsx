import useAuthCurrentUser from "@/app/components/auth/useAuthCurrentUser";
// import useUserRole from "@/app/components/auth/useUserRole";
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
import { useTimestampFormatter } from "../useTimestampFormatter";
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
  const { getMonthAndDayAndWeekday } = useTimestampFormatter();
  const user = useAuthCurrentUser();

  return (
    <>
      {user && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="tracking-widest">
              申込む
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-[350px] sm:max-w-xl max-h-screen my-5">
            {/* <div className="overflow-y-auto max-h-screen"> */}
            <DialogHeader className="text-lg mb-10">
              <DialogTitle className="text-base tracking-wide">
                イベント日：
                <span className="text-2xl">
                  {post.eventDate &&
                    `${getMonthAndDayAndWeekday(post.eventDate)}`}
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
            {/* </div> */}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
