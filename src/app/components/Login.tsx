// import { Button } from "@mui/material";
import { UserCredential, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result: UserCredential) => {
        // alert("ログイン成功しました");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login">
      <button onClick={signIn}>ログイン</button>
    </div>
  );
};

export default Login;
