"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../shadcn/ui/form";
import { Input } from "../../shadcn/ui/input";
import { Button } from "../../shadcn/ui/button";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "2文字以上入力してください。" })
    .max(50, { message: "50文字以下で入力してください。" }),
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z
    .string()
    .min(8, { message: "8文字以上入力してください。" })
    .max(32, { message: "32文字以下で入力してください。" }),
  confirmpassword: z
    .string()
    .min(8, { message: "8文字以上入力してください。" })
    .max(32, { message: "32文字以下で入力してください。" }),
});

const SignupForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const result = formSchema.safeParse(values);
    const errors = result.success ? {} : result.error.flatten().fieldErrors;
    // setErrors(errors);
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ユーザー名</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="ユーザー名を入力してください"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                （このサイトでの表示名となります。後から変更も可能です）
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="メールアドレスを入力してください"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                （登録後に確認のメールをお送りします）
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="パスワードを8~32文字で入力してください"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                （大切に保管しておいてください。忘れてしまった場合は変更可能です）
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード確認</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="もう一度パスワードを入力してください"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                （確認のため登録したパスワードを入力してください）
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">登　録</Button>
      </form>
    </Form>
  );
};

export default SignupForm;
