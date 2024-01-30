import useAuthCurrentUser from "@/app/components/auth/useAuthCurrentUser";
import { Button } from "@/app/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/shadcn/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/shadcn/ui/form";
import { useToast } from "@/app/components/shadcn/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../../../components/shadcn/ui/input";
import { TabsContent } from "../../../../components/shadcn/ui/tabs";

const formSchema = z.object({
  name: z.string().min(1, { message: "名前を入力してください" }),
});

type FormValueType = {
  name: string;
};

type IdType = {
  id: string;
};

const AfterPayTab: FC<IdType> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const user = useAuthCurrentUser();
  // const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<FormValueType> = async (
    values: z.infer<typeof formSchema>
  ) => {
    const result = formSchema.safeParse(values);
    const errors = result.success ? {} : result.error.flatten().fieldErrors;
    const formData = form.getValues();

    if (Object.keys(errors).length === 0) {
      const handleAfterPay = async () => {
        setLoading(true);

        try {
          // const id = params.id;

          // 仮予約データが存在するかチェック
          const _res = await fetch(`/circle/event/api/${id}/findUserId`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              user,
              userName: formData.name,
            }),
          });

          if (!_res.ok) {
            const errorText = await _res.text(); // エラーの詳細を取得
            console.error(
              `サーバーからの応答が正常ではありません。エラー内容: ${errorText}`
            );
            throw new Error("サーバーからの応答が正常ではありません。");
          }

          // overwriteの条件分岐
          const _result = await _res.json();
          const existingApplicationDocData = _result.existingApplicationDocData;
          let overwrite = false;
          if (_result.exists) {
            overwrite = confirm("すでに仮予約されています。上書きしますか？"); // ToDo:alert Dialogの使用を検討
            if (!overwrite) {
              form.reset();
              setLoading(false);
              router.push(`/circle/event/${id}/`);
              return;
            }
          }

          const res = await fetch(`/circle/event/api/${id}/beforePay`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              user,
              userName: formData.name,
              existingApplicationDocData,
              overwrite,
            }),
          });

          if (!res.ok) {
            const errorText = await res.text(); // エラーの詳細を取得
            console.error(
              `サーバーからの応答が正常ではありません。エラー内容: ${errorText}`
            );
            throw new Error("サーバーからの応答が正常ではありません。");
          }

          form.reset();
          setLoading(false);
          router.push("/user/mypage/");
          toast({
            title: "参加申込みを完了しました",
            description: "申込み内容に間違いがないか再度ご確認ください。",
          });
        } catch (error: any) {
          console.error(
            "勉強会への参加申込み中にエラーが発生しました: ",
            error
          );
          alert(`サーバーエラー: ${error?.message}`);
        }
      };

      await handleAfterPay();
    }
  };

  return (
    <TabsContent value="after-payment">
      <Card>
        <CardHeader>
          <CardTitle>仮予約</CardTitle>
          <CardDescription>
            名前を入力して、お申し込みください。
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>名前</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="名前を入力してください"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-24 ${
                  (loading && "opacity-50 cursor-not-allowed") || ""
                }`}
              >
                {loading ? (
                  <div className="animate-spin rounded-full border-t-2 border-r-2 border-b-2 border-white h-6 w-6"></div>
                ) : (
                  "申込む"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </TabsContent>
  );
};

export default AfterPayTab;
