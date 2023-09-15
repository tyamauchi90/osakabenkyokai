// import { Button } from "@mui/material";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/server";
import { FirebaseError } from "firebase/app";

const EmailLogin = () => {
  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((result: UserCredential) => {
        const user = result.user;
      })
      .catch((e) => {
        if (e instanceof FirebaseError) {
          console.log(e);
        }
      });
  };

  return (
    <div className="login">
      <button onClick={signIn}>ログイン</button>
    </div>
  );
};

export default EmailLogin;
