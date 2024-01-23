// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-burger-queen.firebaseapp.com",
  projectId: "mern-burger-queen",
  storageBucket: "mern-burger-queen.appspot.com",
  messagingSenderId: "472515119781",
  appId: "1:472515119781:web:98eea9da77e909c3f79b4c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);