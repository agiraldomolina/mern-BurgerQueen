// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "burgerqueenapi-820cd.firebaseapp.com",
  projectId: "burgerqueenapi-820cd",
  storageBucket: "burgerqueenapi-820cd.appspot.com",
  messagingSenderId: "80066583344",
  appId: "1:80066583344:web:8a83c58f3b1eabedcf86f5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);