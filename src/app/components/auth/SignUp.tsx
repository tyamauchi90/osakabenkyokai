"use client";

import { useState } from "react";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { db } from "../../../firebase/client";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Timestamp } from "firebase/firestore";
import { auth } from "@/firebase/client";
import { useAppDispatch } from "@/app/redux/hooks";
import { signedUp, signedUpFailure } from "@/app/redux/userSlice";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../shadcn/ui/form";
import { Input } from "../shadcn/ui/input";
import { Button } from "../shadcn/ui/button";

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

const SignUp = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSignUp = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const result: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;

      if (user) {
        await sendEmailVerification(user);
        const uid = user.uid;
        const timestamp = Timestamp.now();

        const userInitialData = {
          created_at: timestamp,
          email: email,
          role: "member",
          uid: uid,
          updated_at: timestamp,
          username: username,
          password: password,
        };

        const userDocRef = doc(db, "users", uid);
        await setDoc(userDocRef, userInitialData);
        await updateProfile(user, {
          displayName: username,
        });
        dispatch(signedUp());
        router.push("/");
        alert("確認メールを送信しました。有効化をお願いします。");
      }
    } catch (error) {
      dispatch(signedUpFailure(error));
      alert("アカウント登録に失敗しました。もう1度お試しください。");
      console.error(error);
    }
  };

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
    if (Object.keys(errors).length === 0) {
      handleSignUp(
        values.username,
        values.email,
        values.password,
        values.confirmpassword
      );
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">アカウント登録</h2>
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
    </div>
  );
};

export default SignUp;
