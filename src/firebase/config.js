// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCckWQ310dxN0oLWvUdZuKz1-tethjztW0",
  authDomain: "geniobits-properties.firebaseapp.com",
  projectId: "geniobits-properties",
  storageBucket: "geniobits-properties.appspot.com",
  messagingSenderId: "989423146801",
  appId: "1:989423146801:web:91066421da5dd9542fc210"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getStorage(app)
export const storage = getFirestore(app)

export default app