"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { signInFailure, signInSuccess } from "@/app/redux/userSlice";
import { auth } from "@/firebase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { db } from "../../../firebase/client";
import { Button } from "../shadcn/ui/button";
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
import { useToast } from "../shadcn/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z
    .string()
    .min(8, { message: "8文字以上入力してください。" })
    .max(32, { message: "32文字以下で入力してください。" }),
});

type SignInType = {
  email: string;
  password: string;
};

const SignIn = () => {
  const isSignedIn = useAppSelector((state) => state.user.isSignedIn);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInType> = async (
    values: z.infer<typeof formSchema>
  ) => {
    const result = formSchema.safeParse(values);
    const errors = result.success ? {} : result.error.flatten().fieldErrors;
    if (Object.keys(errors).length === 0) {
      // エラーがない場合にのみサインイン処理を実行
      try {
        await handleSignIn();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const formData = form.getValues();
      const result: UserCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
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

      if (data.password != formData.password) {
        await setDoc(
          userDocRef,
          {
            updated_at: Timestamp.now(),
            password: formData.password,
          },
          {
            merge: true,
          }
        );
      }

      dispatch(signInSuccess());
      form.reset();
      router.push("/");
      toast({
        title: "サインイン完了",
        description: "サインインしました",
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        dispatch(signInFailure(error.message));
        alert(error.message);
        console.error(error);
        toast({
          title: "サインイン失敗",
          description:
            "サインインに失敗しました。メールアドレスとパスワードを再確認してください。",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <Button
            type="submit"
            className={`w-28 ${loading && "opacity-50 cursor-not-allowed"}`}
          >
            {loading ? (
              <div className="animate-spin rounded-full border-t-2 border-r-2 border-b-2 border-white h-6 w-6"></div>
            ) : (
              "サインイン"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
