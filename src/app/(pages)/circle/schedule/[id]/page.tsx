"use client";
import useAuthCurrentUser from "@/app/components/auth/useAuthCurrentUser";
import useUserRole from "@/app/components/auth/useUserRole";
import { Calendar } from "@/app/components/shadcn/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/shadcn/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/shadcn/ui/popover";
import { Textarea } from "@/app/components/shadcn/ui/textarea";
import { useToast } from "@/app/components/shadcn/ui/use-toast";
import { LoadingSkelton } from "@/app/components/ui/LoadingSkelton";
import PrimaryButton from "@/app/components/ui/button/PrimaryButton";
import { postType } from "@/app/type/postType";
import { db } from "@/firebase/client";
import { cn } from "@/lib/utils";
import { FirebaseError } from "@firebase/util";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { Timestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/shadcn/ui/form";
import { Input } from "../../../../components/shadcn/ui/input";
import { useTimestampFormatter } from "../useTimestampFormatter";
import ApplicationDialog from "./ApplicationDialog";

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

const PostDetailPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const router = useRouter();
  const { toast } = useToast();
  const { formatTimestamp } = useTimestampFormatter();
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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/circle/schedule/api/${id}`);
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
    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <div className="container h-screen">
        <p>投稿取得中・・・</p>
        <LoadingSkelton />
      </div>
    );
  }

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

          router.push("/circle/schedule");
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
      if (id) {
        await handleUpdatePost(id);
        setLoading(true);
      }
    }
  };

  const handleDelete = async () => {
    try {
      if (id) {
        const postRef = doc(db, "posts", id);
        if (confirm("本当に削除していいですか？")) {
          await deleteDoc(postRef);
          router.push("/circle/schedule/");
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

  return (
    <>
      <div className="container my-10">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {post.title}
              <div className="flex gap-4">
                {/* 編集ボタン */}
                {(userRole === "admin" || userRole === "master") && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="default">編集</Button>
                    </DialogTrigger>
                    <DialogContent className="w-auto max-w-4xl max-h-screen my-5">
                      <div className="overflow-y-auto max-h-screen">
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
                                            format(field.value, "yyyy.MM.dd")
                                          ) : (
                                            <span>日付を選択してください</span>
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
                                (loading && "opacity-50 cursor-not-allowed") ||
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
                  <PrimaryButton handleClick={handleDelete}>
                    削 除
                  </PrimaryButton>
                )}

                {/* 申込みボタン */}
                <ApplicationDialog post={post} id={id} />
              </div>
            </CardTitle>

            {/* イベント日と本文 */}
            <CardDescription>
              イベント日:
              {post.eventDate ? formatTimestamp(post.eventDate) : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="break-words">
            {post.content && renderWithLineBreaks(post.content)}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PostDetailPage;
