"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { signInSuccess, signInFailure } from "@/app/redux/userSlice";
import { useRouter } from "next/navigation";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/client";
import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
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
} from "../shadcn/ui/form";
import { Input } from "../shadcn/ui/input";
import { Button } from "../shadcn/ui/button";

const formSchema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z
    .string()
    .min(8, { message: "8文字以上入力してください。" })
    .max(32, { message: "32文字以下で入力してください。" }),
});

const SignIn = () => {
  const isSignedIn = useAppSelector((state) => state.user.isSignedIn);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSignIn = async (email: string, password: string) => {
    try {
      const result: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = result.user;
      console.log(user);
      if (!user) {
        throw new Error("ユーザーIDを取得できません");
      }

      const uid = user.uid;
      const userDocRef = doc(db, "users", uid);
      const _snapshot = await getDoc(userDocRef);
      const data = _snapshot.data();

      if (!data) {
        throw new Error("ユーザーデータが存在しません");
      }

      if (data.password != password) {
        await setDoc(
          userDocRef,
          {
            updated_at: serverTimestamp(),
            password: password,
          },
          {
            merge: true,
          }
        );
      }

      dispatch(signInSuccess());
      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        dispatch(signInFailure(error.message));
        alert(error.message);
        console.error(error);
      }
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const result = formSchema.safeParse(values);
    const errors = result.success ? {} : result.error.flatten().fieldErrors;
    if (Object.keys(errors).length === 0) {
      // エラーがない場合にのみサインイン処理を実行
      handleSignIn(values.email, values.password);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* <h1>ようこそ、{isSignedIn || "ゲスト"}さん！</h1> */}
      {/* <h2 className="text-2xl font-semibold mb-4">サインイン</h2> */}
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
    </div>
  );
};

export default SignIn;
