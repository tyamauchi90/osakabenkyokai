"use client";
import DeleteUser from "@/app/components/auth/DeleteUser";
import ResetPassword from "@/app/components/auth/ResetPassword";
import SignOut from "@/app/components/auth/SignOut";
import UpdateEmail from "@/app/components/auth/UpdateEmail";
import UpdateUsername from "@/app/components/auth/UpdateUsername";
import useAuthCurrentUser from "@/app/components/auth/useAuthCurrentUser";
import { auth } from "@/firebase/client";

const Mypage = () => {
  const user = useAuthCurrentUser();
  // const [user, setUser] = useState(currentUser);

  console.log(user);

  return (
    <>
      {user?.emailVerified ? (
        <p>サインイン中です！</p>
      ) : (
        <p>まだ認証が済んでいません。メールをご確認ください</p>
      )}
      <br />
      <p>【表示名】　{user?.displayName}</p>
      <p>【uid】　{user?.uid}</p>
      <p>【email】{user?.email}</p>
      {user?.photoURL ? (
        <img src={user.photoURL} alt="ユーザーのプロフィール画像" />
      ) : null}
      <br />
      <UpdateEmail />
      <br />
      <UpdateUsername />
      <br />
      <ResetPassword firebaseAuth={auth} />
      <br />
      <SignOut />
      <br />
      <DeleteUser />
    </>
  );
};

export default Mypage;
