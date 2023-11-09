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
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/app/components/shadcn/ui/use-toast";
import { db } from "@/firebase/client";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import DatePickerForm from "./DatePickerForm";

const FormSchema = z.object({
  eventDate: z.date({
    required_error: "日付を入力してください",
  }),
});

export default function CreateEvent() {
  const router = useRouter();
  const { toast } = useToast();

  // const [postId, setPostId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [eventDate, setEventDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    // defaultValues: {
    // },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // e.preventDefault();
    if (!eventDate) {
      toast({
        title: "Error",
        description: "日付を入力してください",
      });
      return;
    }
    setLoading(true);

    try {
      toast({
        title: "日付を設定しました",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {/* {JSON.stringify({ title, content, eventDate }, null, 2)} */}
              {JSON.stringify(data, null, 2)}
            </code>
          </pre>
        ),
      });
      await createPost(title, content, eventDate);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      router.push("/articles/new");
      location.reload();
    }
  };

  // ブログ記事の作成（createPost）
  const createPost = async (
    title: string,
    content: string,
    eventDate: Date
    // postId: string
  ) => {
    try {
      const postsCollectionRef = collection(db, "posts");
      await addDoc(postsCollectionRef, {
        title,
        content,
        eventDate: Timestamp.fromDate(eventDate), // DateをTimestampに変換
      });
      console.log("記事が作成されました");
    } catch (error) {
      console.error("記事の作成中にエラーが発生しました: ", error);
    }
  };

  // // ブログ記事の更新（Update）
  // const updatePost = async (postId: string, newContent: string) => {
  //   try {
  //     const postRef: DocumentReference<DocumentData> = doc(db, 'posts', postId);
  //     await updateDoc(postRef, {
  //       content: newContent,
  //     });
  //     console.log("記事が更新されました。");
  //   } catch (error) {
  //     console.error("記事の更新中にエラーが発生しました: ", error);
  //   }
  // }

  // // ブログ記事の削除（Delete）
  // const deletePost = async (postId: string) => {
  //   try {
  //     const postRef: DocumentReference<DocumentData> = doc(db, 'posts', postId);
  //     await deleteDoc(postRef);
  //     console.log("記事が削除されました。");
  //   } catch (error) {
  //     console.error("記事の削除中にエラーが発生しました: ", error);
  //   }
  // }

  return (
    <>
      <div className="m-4">
        <h1 className="text-2xl font-semibold mb-4">勉強会（新規作成）</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                タイトル
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>

              {/* <label className="block text-sm font-semibold mb-2">
            イベント日
            <input
              type="date"
              value={eventDate.toISOString().split("T")[0]} // Date型をISO文字列に変換して設定
              onChange={(e) => setEventDate(new Date(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </label> */}
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
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">本文</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <button
              type="submit"
              className={`w-14 bg-orange-400 text-white p-2 rounded ${
                (loading && "w-20 opacity-50 cursor-not-allowed") || ""
              }`}
            >
              {loading ? "作成中..." : "作成"}
            </button>
          </form>
        </Form>
      </div>
    </>
  );
}
