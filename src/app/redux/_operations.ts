import { db, auth, functions } from "../../firebase/client";
import { Timestamp, collection, doc, getDoc, setDoc } from "firebase/firestore";
import {
  UserCredential,
  createUserWithEmailAndPassword as createUserWithEmailAndPasswordV9,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  isValidEmailFormat,
  isValidRequiredInput,
} from "../../function/common";
// import { hideLoadingAction, showLoadingAction } from "./loading";
import { httpsCallable } from "firebase/functions";
// import { signin } from "./userSlice";
import { useAppDispatch } from "./hooks";
import { useRouter } from "next/navigation";
import { signInSuccess } from "./userSlice";

//_______________________________________//

export const signUp = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  return async () => {
    const router = useRouter();
    // const dispatch = useAppDispatch();
    // Validations
    if (!isValidRequiredInput(username, email, password, confirmPassword)) {
      alert("必須項目が未入力です。");
      return false;
    }

    if (!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です。もう1度お試しください。");
      return false;
    }
    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう1度お試しください。");
      return false;
    }
    if (password.length < 6) {
      alert("パスワードは6文字以上で入力してください。");
      return false;
    }

    try {
      const result: UserCredential = await createUserWithEmailAndPasswordV9(
        auth,
        email,
        password
      );
      // dispatch(showLoadingAction("Sign up..."));

      //アカウントが正常に作成された場合
      const user = result.user;
      if (user) {
        const uid = user.uid;
        const timestamp = Timestamp.now();

        const userInitialData = {
          created_at: timestamp,
          email: email,
          role: "member",
          uid: uid,
          updated_at: timestamp,
          username: username,
          password: password,
        };

        // Firestore でデータを設定
        const userDocRef = doc(db, "users", uid);
        await setDoc(userDocRef, userInitialData);

        // Cloud Functions の呼び出し
        // const sendThankYouMailFn = httpsCallable(functions, "sendThankYouMail");
        // await sendThankYouMailFn({
        //   email: email,
        //   userId: uid,
        //   username: username,
        // });
        router.push("/");
        // dispatch(hideLoadingAction());
        // return true;
      }
    } catch (error) {
      // dispatch(hideLoadingAction());
      alert("アカウント登録に失敗しました。もう1度お試しください。");
      console.error(error);
      // return false;
    }
  };
};

//_______________________________________//

export const signIn = (email: string, password: string) => {
  return async () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    // dispatch(showLoadingAction("Sign in..."));

    if (!isValidRequiredInput(email, password)) {
      // dispatch(hideLoadingAction());
      alert("メールアドレスかパスワードが未入力です。");
      return false;
    }

    if (!isValidEmailFormat(email)) {
      // dispatch(hideLoadingAction());
      alert("メールアドレスの形式が不正です。");
      return false;
    }

    try {
      // ログインリクエストをFirebase Authenticationに送信
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      if (!user) {
        // dispatch(hideLoadingAction());
        throw new Error("ユーザーIDを取得できません");
      }

      //サインインしたユーザーの情報をfirestoreから取得
      const userId = user.uid;

      const userDocRef = doc(db, "users", userId);
      const snapshot = await getDoc(userDocRef);

      const data = snapshot.data();

      if (!data) {
        // dispatch(hideLoadingAction());
        throw new Error("ユーザーデータが存在しません");
      }

      // ログイン成功時の処理
      dispatch(signInSuccess(user));
      await router.push("/");
    } catch (error) {
      // dispatch(hideLoadingAction());
      console.error(error);
    }
  };
};
