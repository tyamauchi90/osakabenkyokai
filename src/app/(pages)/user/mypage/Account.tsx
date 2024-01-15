import DeleteUser from "@/app/components/auth/DeleteUser";
import ResetPassword from "@/app/components/auth/ResetPassword";
import SignOut from "@/app/components/auth/SignOut";
import UpdateEmail from "@/app/components/auth/UpdateEmail";
import UpdateUsername from "@/app/components/auth/UpdateUsername";
import useAuthCurrentUser from "@/app/components/auth/useAuthCurrentUser";
import { Card } from "@/app/components/shadcn/ui/card";
import { Separator } from "@/app/components/shadcn/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/AccountAccordion";
import { auth } from "@/firebase/client";

const Account = () => {
  const user = useAuthCurrentUser();

  return (
    <>
      <Card className="break-words p-5 mb-10 max-w-lg space-y-7 shadow-md">
        {user?.emailVerified ? (
          <p>サインイン中です！</p>
        ) : (
          <p>まだ認証が済んでいません。メールをご確認ください</p>
        )}
        <p>【表示名】{user?.displayName}</p>
        <p>【ユーザーID】{user?.uid}</p>
        <p>【メールアドレス】{user?.email}</p>
        <SignOut />
      </Card>
      <Separator />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>メールアドレスを変更したい</AccordionTrigger>
          <AccordionContent>
            <UpdateEmail />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>ユーザー名を変更したい</AccordionTrigger>
          <AccordionContent>
            <UpdateUsername />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>パスワードをリセットしたい</AccordionTrigger>
          <AccordionContent>
            <div className="py-4 max-w-md mx-auto text-justify leading-loose">
              <p className="text-lg">（リセット後の手順）</p>
              <ul className="list-decimal pt-4 mx-5">
                <li>「パスワードをリセット」ボタンを押す</li>
                <li>
                  {user?.displayName}
                  様のメールアドレスに、確認のメールアドレスが届きます
                </li>
                <li>記載されたリセット用のリンクをクリックします</li>
                <li>パスワードの再設定画面で、新しいパスワードを設定します</li>
              </ul>
              <ResetPassword firebaseAuth={auth} />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>退会したい</AccordionTrigger>
          <AccordionContent>
            <div className="py-4 max-w-md mx-auto text-justify leading-loose">
              <p>（注意）</p>
              <p>
                一度退会するとデータを復元することはできませんので、慎重にご検討ください
              </p>
              <DeleteUser />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Account;
