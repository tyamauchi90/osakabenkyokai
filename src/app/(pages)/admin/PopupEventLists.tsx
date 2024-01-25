"use client";
import { LoadingSkelton } from "@/app/components/ui/LoadingSkelton";
import useAllPosts from "@/app/swr/useAllPosts";
import { postType } from "@/app/type/postType";
// import Link from "next/link";
import { Button } from "@/app/components/shadcn/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/shadcn/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/shadcn/ui/popover";
import { Textarea } from "@/app/components/shadcn/ui/textarea";
import { useToast } from "@/app/components/shadcn/ui/use-toast";
import { db } from "@/firebase/client";
import { cn } from "@/lib/utils";
import { FirebaseError } from "@firebase/util";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { Timestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/shadcn/ui/card";

import useAuthCurrentUser from "@/app/components/auth/useAuthCurrentUser";
import useUserRole from "@/app/components/auth/useUserRole";
import { Calendar } from "@/app/components/shadcn/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/shadcn/ui/form";
import { Input } from "@/app/components/shadcn/ui/input";
import { TimestampType } from "@/app/type/TimestampType";
import { useTimestampFormatter } from "../circle/event/useTimestampFormatter";

const formSchema = z.object({
  title: z.string().min(1, { message: "タイトルを入力してください" }),
  eventDate: z.date({ required_error: "日付を入力してください" }),
  content: z.string().min(1, { message: "内容を入力してください。" }),
});

type FormValuesType = {
  title: string;
  eventDate: Date;
  content: string;
};

function PopupEventLists() {
  const { data: posts, error, isLoading } = useAllPosts();
  const router = useRouter();
  const { toast } = useToast();
  const { getMonthAndDayAndWeekday } = useTimestampFormatter();
  const user = useAuthCurrentUser();
  const userRole = useUserRole(user ? user.uid : null);

  const [post, setPost] = useState<postType | null>(null);
  const [loading, setLoading] = useState(false);

  const defaultEventDate =
    post?.eventDate instanceof Timestamp ? post.eventDate.toDate() : undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
      eventDate: defaultEventDate,
      content: post?.content || "",
    },
  });
  const formData = form.getValues();

  const onSubmit: SubmitHandler<FormValuesType> = async (
    values: z.infer<typeof formSchema>
  ) => {
    const result = formSchema.safeParse(values);
    const errors = result.success ? {} : result.error.flatten().fieldErrors;

    if (Object.keys(errors).length === 0) {
      const handleUpdatePost = async (id: string) => {
        try {
          setLoading(true);
          // Firestoreに更新をかけるデータ
          const data = {
            title: formData.title,
            eventDate:
              formData.eventDate instanceof Date &&
              Timestamp.fromDate(formData.eventDate), // Date型をTimestamp型に変換
            content: formData.content,
            updated_at: Timestamp.now(),
          };

          if (!id) {
            console.error("idがありません");
            return;
          }

          const postRef = doc(db, "posts", id);
          await updateDoc(postRef, data);

          router.push("/admin/");
          router.refresh();
          toast({
            title: "編集完了しました",
            description: "編集内容に間違いがないか再度ご確認ください。",
          });
          // setLoading(false);
        } catch (e) {
          if (e instanceof FirebaseError) {
            console.error(e);
          }
          console.error(e);
          toast({
            variant: "destructive",
            title: "編集に失敗しました",
            description: "もう一度お試しください",
          });
          setLoading(false);
          throw e; // エラーを再度スローし、呼び出し元で処理する
        }
      };
      // idを持っているか確認して更新処理を実行
      const id = post?.id;
      if (id) {
        await handleUpdatePost(id);
        setLoading(true);
      }
    }
  };

  const fetchPost = async (id: string) => {
    try {
      const res = await axios.get(`/circle/evnet/api/${id}`);
      setPost(res.data);
      form.setValue("title", res.data?.title || "");
      if (res.data?.eventDate) {
        const date = new Date(res.data.eventDate.seconds * 1000);
        form.setValue("eventDate", date);
      } else {
        form.setValue("eventDate", new Date());
      }
      form.setValue("content", res.data?.content || "");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (id: string) => {
    fetchPost(id);
  };

  const handleDelete = async (id: string) => {
    try {
      if (id) {
        const postRef = doc(db, "posts", id);
        if (confirm("本当に削除していいですか？")) {
          await deleteDoc(postRef);
          router.push("/circle/evnet/");
          toast({
            title: "削除完了しました",
            description: "削除内容に間違いがないか再度ご確認ください。",
          });
          // setLoading(false);
        }
      }
    } catch (error) {
      console.error("記事の削除中にエラーが発生しました: ", error);
    }
  };

  // 文章の整形
  function renderWithLineBreaks(firestoreData: string) {
    return (
      <p>
        {firestoreData.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
    );
  }

  if (isLoading) {
    return (
      <div className="container h-screen">
        <p>投稿取得中・・・</p>
        <LoadingSkelton />
      </div>
    );
  }

  // if (!post) {
  //   return (
  //     <div className="container h-screen">
  //       <p>イベントが見つかりませんでした</p>
  //     </div>
  //   );
  // }

  return (
    <ul>
      {error && <div>Error loading data</div>}

      {posts &&
        posts.map((post: postType) => {
          const id = post.id;
          const date =
            post && post.eventDate
              ? new Date(
                  ((post.eventDate as unknown as TimestampType)._seconds ||
                    post.eventDate.seconds) * 1000
                )
              : undefined;
          const canCancel = date && date > new Date();

          return (
            <li key={id} className="w-fll my-10 sm:m-10">
              <Card
                className={`w-full group md:hover:shadow-md transition duration-300 ease ${
                  !canCancel &&
                  "text-gray-500 bg-black bg-opacity-20 pointer-events-none"
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex flex-wrap-reverse items-center justify-between gap-7">
                    {post.title}
                    <div className="w-full sm:w-auto flex justify-center gap-7 pb-7 sm:pb-0 border-b sm:border-b-0">
                      {/* 編集ボタン */}
                      {(userRole === "admin" || userRole === "master") && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="md:opacity-10 md:group-hover:opacity-100 transition duration-300 ease"
                              variant={canCancel ? "default" : "ghost"}
                              id={id}
                              onClick={() => handleEdit(id)}
                            >
                              編集
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="m-auto max-w-[90vw] max-h-[90vh] overflow-y-scroll">
                            <div className="w-[76vw] mx-auto my-[5vh]">
                              <DialogHeader>
                                <DialogTitle>編集</DialogTitle>
                              </DialogHeader>
                              {/* タイトル */}
                              <Form {...form}>
                                <form
                                  onSubmit={form.handleSubmit(onSubmit)}
                                  className="space-y-8"
                                >
                                  <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>タイトル</FormLabel>
                                        <FormControl>
                                          <Input
                                            type="text"
                                            placeholder="タイトルを入力してください"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormDescription>
                                          （新しいタイトルを入力してください）
                                        </FormDescription>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  {/* イベント日 */}
                                  <FormField
                                    control={form.control}
                                    name="eventDate"
                                    render={({ field }) => (
                                      <FormItem className="flex flex-col">
                                        <FormLabel>イベント日</FormLabel>

                                        <Popover>
                                          <PopoverTrigger asChild>
                                            <FormControl>
                                              <Button
                                                variant="outline"
                                                className={cn(
                                                  "w-[240px] pl-3 text-left font-normal",
                                                  !field.value &&
                                                    "text-muted-foreground"
                                                )}
                                              >
                                                {field.value ? (
                                                  format(
                                                    field.value,
                                                    "yyyy.MM.dd"
                                                  )
                                                ) : (
                                                  <span>
                                                    日付を選択してください
                                                  </span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                              </Button>
                                            </FormControl>
                                          </PopoverTrigger>
                                          <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                          >
                                            <Calendar
                                              mode="single"
                                              selected={field.value}
                                              onSelect={field.onChange}
                                              // disabled={(date: Date) =>
                                              //   date > new Date() || date < new Date("1900-01-01")
                                              // }
                                              initialFocus
                                            />
                                          </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                          カレンダーを選択すると日付が入力されます
                                        </FormDescription>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  {/* 本文 */}
                                  <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>内容</FormLabel>
                                        <FormControl>
                                          <Textarea
                                            className="min-h-[200px]"
                                            placeholder="内容を入力してください"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormDescription>
                                          （新しい内容を入力してください）
                                        </FormDescription>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <Button
                                    type="submit"
                                    className={`w-24 ${
                                      (loading &&
                                        "opacity-50 cursor-not-allowed") ||
                                      ""
                                    }`}
                                  >
                                    {loading ? (
                                      <div className="animate-spin rounded-full border-t-2 border-r-2 border-b-2 border-white h-6 w-6"></div>
                                    ) : (
                                      "更　新"
                                    )}
                                  </Button>
                                </form>
                              </Form>
                            </div>
                            <DialogFooter className="sm:justify-start">
                              <DialogClose asChild></DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}

                      {/* 削除ボタン */}
                      {(userRole === "admin" || userRole === "master") && (
                        <Button
                          variant={canCancel ? "default" : "ghost"}
                          className="md:opacity-10 md:group-hover:opacity-100 transition duration-300 ease"
                          id={id}
                          onClick={() => handleDelete(id)}
                        >
                          削 除
                        </Button>
                      )}
                    </div>
                  </CardTitle>

                  {/* イベント日と本文 */}
                  <CardDescription>
                    イベント日:
                    {post.eventDate
                      ? getMonthAndDayAndWeekday(post.eventDate)
                      : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent className="break-words">
                  {post.content && renderWithLineBreaks(post.content)}
                </CardContent>
              </Card>
            </li>
          );
        })}
    </ul>
  );
}

export default PopupEventLists;
