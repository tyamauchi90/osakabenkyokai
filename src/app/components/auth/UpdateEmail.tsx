import { auth, db } from "@/firebase/client";
import { FirebaseError } from "@firebase/util";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
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

const formSchema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z
    .string()
    .min(8, { message: "8文字以上入力してください。" })
    .max(32, { message: "32文字以下で入力してください。" }),
});

type FormValuesType = {
  email: string;
  password: string;
};

const UpdateEmail = () => {
  const [newEmail, setNewEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValuesType> = async (
    values: z.infer<typeof formSchema>
  ) => {
    const result = formSchema.safeParse(values);
    const errors = result.success ? {} : result.error.flatten().fieldErrors;
    if (Object.keys(errors).length === 0) {
      // エラーがない場合にのみメールアドレス変更用メールを送信
      const newEmail = values.email;
      const password = values.password;
      setNewEmail(newEmail); // 新しいメールアドレスを設定
      setPassword(password);

      const handleUpdateEmail = async () => {
        try {
          const user = auth.currentUser;
          if (user) {
            // Authentication
            const credential = await EmailAuthProvider.credential(
              user?.email ?? "",
              password
            );
            user && (await reauthenticateWithCredential(user, credential));
            user && (await updateEmail(user, newEmail));

            //Firestore
            const uid = user.uid;
            const userDocRef = doc(db, "users", uid);
            await setDoc(
              userDocRef,
              {
                updated_at: serverTimestamp(),
                email: newEmail,
              },
              {
                merge: true, // 既存のデータとマージ
              }
            );
          }
          router.push("/");
          window.location.reload();
          alert(
            "新しいメールアドレスに確認のメールを送信しました。メールをご確認の上、手続きを完了させてください。"
          );
        } catch (e) {
          if (e instanceof FirebaseError) {
            console.error(e);
          }
          console.error(e);
          throw e; // エラーを再度スローし、呼び出し元で処理する
        }
      };
      await handleUpdateEmail();
    }
  };

  return (
    <div className="max-w-md mx-auto my-7">
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
                  （新しいメールアドレスを入力してください）
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
          <Button type="submit">更　新</Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateEmail;
