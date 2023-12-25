"use client";
import { db } from "@/firebase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/shadcn/ui/form";
import { Input } from "../components/shadcn/ui/input";
import { Textarea } from "../components/shadcn/ui/textarea";
import { useToast } from "../components/shadcn/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1, { message: "名前を入力してください" }),
  email: z
    .string()
    .email({ message: "メールアドレスの形式ではありません。" })
    .min(1, { message: "メールアドレスを入力してください" }),
  message: z.string().min(1, { message: "お問合せ内容を入力してください" }),
});

type ContactFormType = {
  name: string;
  email: string;
  message: string;
};

const ContactPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit: SubmitHandler<ContactFormType> = async (
    values: z.infer<typeof formSchema>
  ) => {
    const result = formSchema.safeParse(values);
    const errors = result.success ? {} : result.error.flatten().fieldErrors;

    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true);
        const formData = form.getValues();
        const docRef = await addDoc(collection(db, "contacts"), {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          updated_at: Timestamp.now(),
        });

        form.reset();
        router.refresh();
        toast({
          title: "送信完了しました",
          description: "お問い合わせいただきありがとうございます",
        });
        setLoading(false);
      } catch (e) {
        if (e instanceof FirebaseError) {
          console.error(e);
        }
        console.error(e);
        toast({
          variant: "destructive",
          title: "送信に失敗しました",
          description: "もう一度お試しください",
        });
        setLoading(false);
        throw e;
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-10">
      <h1 className="text-5xl text-center mb-10">お問い合わせ</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* 名前 */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">名前</FormLabel>
                <FormControl>
                  <Input
                    className=""
                    placeholder="名前を入力してください"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* メールアドレス */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">メールアドレス</FormLabel>
                <FormControl>
                  <Input
                    className=""
                    placeholder="メールアドレスを入力してください"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* メールアドレス */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">お問合せ内容</FormLabel>
                <FormControl>
                  <Textarea
                    className=" min-h-[200px]"
                    placeholder="お問合せ内容を入力してください"
                    {...field}
                  />
                </FormControl>
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
              "送　信"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactPage;
