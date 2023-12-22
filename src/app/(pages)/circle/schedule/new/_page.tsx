"use client";
import { Button } from "@/app/components/shadcn/ui/button";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/shadcn/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/app/components/shadcn/ui/input";
import { Textarea } from "@/app/components/shadcn/ui/textarea";
import { useToast } from "@/app/components/shadcn/ui/use-toast";
import { db } from "@/firebase/client";
import { Timestamp, addDoc, collection, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import DatePickerForm from "./DatePickerForm";

const formSchema = z.object({
  title: z.string().min(1, { message: "タイトルを入力してください" }),
  eventDate: z.date({
    required_error: "日付を入力してください",
  }),
  content: z.string().min(1, { message: "内容を入力してください。" }),
});

type FormValuesType = {
  title: string;
  eventDate: Date;
  content: string;
};

export default function CreateEvent() {
  const router = useRouter();
  const { toast } = useToast();

  const [postId, setPostId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [eventDate, setEventDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", eventDate: new Date(), content: "" },
  });

  const onSubmit: SubmitHandler<FormValuesType> = async (
    values: z.infer<typeof formSchema>
  ) => {
    try {
      setLoading(true);
      const result = formSchema.safeParse(values);
      const errors = result.success ? {} : result.error.flatten().fieldErrors;
      if (Object.keys(errors).length === 0) {
        const newTitle = values.title;
        const newEventDate =
          values.eventDate instanceof Date
            ? values.eventDate
            : new Date(values.eventDate);
        const newContent = values.content;
        setTitle(newTitle); // 新しいタイトルを設定
        setEventDate(newEventDate); // 新しいイベント日を設定
        setContent(newContent); // 新しい本文を設定
        await createPost(newTitle, newContent, newEventDate);
        toast({
          title: "作成完了",
          description: "新規投稿が完了しました",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "作成失敗",
        description: "エラーが発生しました。もう一度お試しください。",
      });
    } finally {
      form.reset();
      router.push("/circle/schedule/new");
      setLoading(false);
    }
  };

  // ブログ記事の作成（createPost）
  const createPost = async (
    title: string,
    content: string,
    eventDate: Date
  ) => {
    try {
      const postsCollectionRef = collection(db, "posts");

      // Firestoreに更新をかけるデータ
      const data = {
        title: form.getValues("title"), // 新しいタイトル
        eventDate: form.getValues("eventDate"), // 新しいイベント日
        content: form.getValues("content"), // 新しい本文
        updated_at: Timestamp.now(),
      };
      const docRef = await addDoc(postsCollectionRef, data);

      // 生成されたドキュメントIDをidにセットする
      await updateDoc(docRef, {
        id: docRef.id,
      });
    } catch (error) {
      console.error("記事の作成中にエラーが発生しました: ", error);
    }
  };

  return (
    <>
      <div className="m-4">
        <h1 className="text-2xl font-semibold mb-4">勉強会（新規作成）</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-4">
              {/* タイトル */}
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
                              !field.value && "text-muted-foreground"
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
                      <PopoverContent className="w-auto p-0" align="start">
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
                  (loading && "opacity-50 cursor-not-allowed") || ""
                }`}
              >
                {loading ? (
                  <div className="animate-spin rounded-full border-t-2 border-r-2 border-b-2 border-white h-6 w-6"></div>
                ) : (
                  "作　成"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
