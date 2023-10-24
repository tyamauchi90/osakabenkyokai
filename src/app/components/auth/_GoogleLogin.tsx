// // import { Button } from "@mui/material";
// import { UserCredential, signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../../../firebase/index";
// import { FirebaseError } from "firebase/app";

// const GoogleLogin = () => {
//   const signIn = () => {
//     signInWithPopup(auth, provider)
//       .then((result: UserCredential) => {
//         // alert("ログイン成功しました");
//       })
//       .catch((e) => {
//         if (e instanceof FirebaseError) {
//           console.log(e);
//         }
//       });
//   };

//   return (
//     <div className="login">
//       <button onClick={signIn}>ログイン</button>
//     </div>
//   );
// };

// export default GoogleLogin;
