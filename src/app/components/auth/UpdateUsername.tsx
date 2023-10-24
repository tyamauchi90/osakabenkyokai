import { auth, db } from "@/firebase/client";
import { FirebaseError } from "firebase/app";
import { updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
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
});

type FormValuesType = {
  username: string;
};

const UpdateUsername = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit: SubmitHandler<FormValuesType> = async (
    values: z.infer<typeof formSchema>
  ) => {
    const result = formSchema.safeParse(values);
    const errors = result.success ? {} : result.error.flatten().fieldErrors;
    if (Object.keys(errors).length === 0) {
      // エラーがない場合にのみユーザー名を変更する

      const newUsername = values.username;
      await setUsername(newUsername); // 新しいユーザー名を設定

      const handleUpdateUsername = async () => {
        try {
          const user = auth.currentUser;
          if (user) {
            const uid = user.uid;
            const userDocRef = doc(db, "users", uid);
            await setDoc(
              userDocRef,
              {
                updated_at: serverTimestamp(),
                username: newUsername,
              },
              {
                merge: true, // 既存のデータとマージ
              }
            );
            await updateProfile(user, {
              displayName: newUsername,
            });
          }
          router.push("/");
          window.location.reload();
          alert("表示名を変更しました");
        } catch (e) {
          if (e instanceof FirebaseError) {
            console.error(e);
          }
          console.error(e);
          throw e; // エラーを再度スローし、呼び出し元で処理する
        }
      };
      await handleUpdateUsername(); // 非同期処理を待つ
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="bg-gradient-to-r from-yellow-100 px-2 py-4 rounded">
        ユーザー名を変更する
      </h2>
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
                  （新しいユーザー名を入力してください）
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

export default UpdateUsername;
