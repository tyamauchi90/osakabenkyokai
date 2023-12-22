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
      <Card className="p-5 max-w-lg space-y-7 mb-10">
        {user?.emailVerified ? (
          <p>サインイン中です！</p>
        ) : (
          <p>まだ認証が済んでいません。メールをご確認ください</p>
        )}
        <p>【表示名】　{user?.displayName}</p>
        <p>【uid】　{user?.uid}</p>
        <p>【email】{user?.email}</p>
        {user?.photoURL ? (
          <img src={user.photoURL} alt="ユーザーのプロフィール画像" />
        ) : null}
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
            <ResetPassword firebaseAuth={auth} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>退会したい</AccordionTrigger>
          <AccordionContent>
            <DeleteUser />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Account;
