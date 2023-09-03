import { Auth, signOut } from "@firebase/auth";
import { auth } from "../../utils/firebase";

const Logout = () => {
  const logout = () => {
    signOut(auth as Auth)
      .then(() => {
        alert("ログアウトしました");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="logout">
      <button onClick={logout}>ログアウト</button>
    </div>
  );
};

export default Logout;
