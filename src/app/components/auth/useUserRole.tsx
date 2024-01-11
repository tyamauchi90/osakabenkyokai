import { db } from "@/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const useUserRole = (uid: string | null) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const getUserRole = async () => {
      if (uid) {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserRole(docSnap.data().role);
        } else {
          console.log("No such document!");
        }
      }
    };

    getUserRole();
  }, [uid]);

  return userRole;
};

export default useUserRole;
