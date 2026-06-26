


import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "interviewiq-3bdb2.firebaseapp.com",
  projectId: "interviewiq-3bdb2",
  storageBucket: "interviewiq-3bdb2.firebasestorage.app",
  messagingSenderId: "540712539550",
  appId: "1:540712539550:web:410609edaaf124b2f3328f",
  measurementId: "G-0XWD6Z8560"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
