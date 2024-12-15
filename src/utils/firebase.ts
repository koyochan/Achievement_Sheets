import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-vWJGn_m8PvxXQUy9o8SXDUzUY_2T6GU",
  authDomain: "tenxer-education.firebaseapp.com",
  projectId: "tenxer-education",
  storageBucket: "tenxer-education.firebasestorage.app",
  messagingSenderId: "211660721667",
  appId: "1:211660721667:web:f61c014c1117cf41158836",
  measurementId: "G-TWD7420PNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);