// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDONNySWDd9-rmwEjv6j4jvegA6XKhDaj8",
  authDomain: "osakabenkyokai.firebaseapp.com",
  projectId: "osakabenkyokai",
  storageBucket: "osakabenkyokai.appspot.com",
  messagingSenderId: "50224801603",
  appId: "1:50224801603:web:21f29851479830b260b1f6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
