'use client'

 import{ initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider, onAuthStateChanged,signOut  } from "firebase/auth";
import { getFirestore,collection,addDoc } from "firebase/firestore";

    // Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACJHLhS6Wwbj4ltzP-KGsp7Ncj8oDCBBI",
  authDomain: "authentication-with-next-3eda4.firebaseapp.com",
  projectId: "authentication-with-next-3eda4",
  storageBucket: "authentication-with-next-3eda4.firebasestorage.app",
  messagingSenderId: "670948636310",
  appId: "1:670948636310:web:02eba091de2e1548d774b7",
  measurementId: "G-D0XV18L3ZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export{
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    provider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    db,
    collection,
    addDoc
  }