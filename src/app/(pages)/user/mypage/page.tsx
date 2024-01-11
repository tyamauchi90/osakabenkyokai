"use client";
import useAuthCurrentUser from "@/app/components/auth/useAuthCurrentUser";
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
import Account from "./Account";
import Reservation from "./Reservation";

const Mypage = () => {
  const user = useAuthCurrentUser();

  return (
    <>
      {user && (
        <Tabs
          defaultValue="reservation"
          className="w-full mt-5 mb-10 space-y-7 sm:space-y-12"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reservation">予約一覧</TabsTrigger>
            <TabsTrigger value="account">アカウント</TabsTrigger>
          </TabsList>
          <TabsContent value="reservation" className="container">
            <Card>
              <CardHeader>
                <CardTitle>予約一覧</CardTitle>
                <CardDescription>
                  お申し込みいただいた勉強会の予約一覧です
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full flex flex-wrap items-center justify-start gap-7">
                <Reservation />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>アカウント</CardTitle>
                <CardDescription>
                  アカウントに関する操作を以下からお選びください
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-0">
                <Account />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </>
  );
};

export default Mypage;
