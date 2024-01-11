"use client";
import useAuthCurrentUser from "@/app/components/auth/useAuthCurrentUser";
import useUserRole from "@/app/components/auth/useUserRole";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/shadcn/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/shadcn/ui/tabs";
import CreateEventForm from "../circle/schedule/new/CreateEventForm";
import { useTimestampFormatter } from "../circle/schedule/useTimestampFormatter";
import AllReservations, { CellType, columns } from "./AllReservations";
import PopupEventLists from "./PopupEventLists";
import { useFetchAllReservations } from "./useFetchAllReservations";

const AdminPage = () => {
  const applications = useFetchAllReservations();
  const { getDate } = useTimestampFormatter();
  const user = useAuthCurrentUser();
  const userRole = useUserRole(user ? user.uid : null);

  const data: CellType[] = applications.map((application) => {
    const eventDate = getDate(application.eventDate);
    const applyDate = getDate(application.applyDate);

    return {
      eventDate: application.eventDate && eventDate,
      userId: application.userId,
      userName: application.userName,
      applyDate: application.applyDate && applyDate,
      isPaid: application.isPaid ? "支払済み" : "当日支払い",
    };
  });

  return (
    <>
      {(userRole === "admin" || userRole === "master") && (
        <Tabs
          defaultValue="allreservations"
          className="w-full mt-5 mb-10 space-y-7 sm:space-y-12"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="allreservations">参加者一覧</TabsTrigger>
            <TabsTrigger value="create">イベント作成</TabsTrigger>
            <TabsTrigger value="fix">イベント編集・削除</TabsTrigger>
          </TabsList>
          <TabsContent value="allreservations" className="container">
            <Card>
              <CardHeader>
                <CardTitle>参加者一覧</CardTitle>
                <CardDescription>勉強会の参加者一覧です</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <AllReservations columns={columns} data={data} />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>イベント作成</CardTitle>
                <CardDescription>新しいイベントを作成します</CardDescription>
              </CardHeader>
              <CardContent className="space-y-0">
                <CreateEventForm />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="fix">
            <Card>
              <CardHeader>
                <CardTitle>イベント編集・削除</CardTitle>
                <CardDescription>
                  既存イベントを編集・削除します
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-0">
                <PopupEventLists />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </>
  );
};

export default AdminPage;
