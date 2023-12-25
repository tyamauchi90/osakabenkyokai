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
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z
    .string()
    .min(8, { message: "8文字以上入力してください。" })
    .max(32, { message: "32文字以下で入力してください。" }),
});

const SigninForm = ({
  handleSignIn,
}: {
  handleSignIn: (email: string, password: string) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const result = formSchema.safeParse(values);
    const errors = result.success ? {} : result.error.flatten().fieldErrors;
    // setErrors(errors);
    handleSignIn(values.email, values.password); // handleSignInを呼び出し
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md space-y-8"
      >
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
                （ご登録いただいたメールアドレスを入力してください）
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
                  placeholder="パスワードを入力してください"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                （ご登録いただいたパスワードを入力してください）
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">ログイン</Button>
      </form>
    </Form>
  );
};

export default SigninForm;
