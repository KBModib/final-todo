// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3JutKTPQjuqsS6LbFbAUYRlKEVfZCCqQ",
  authDomain: "final-todo-9ac56.firebaseapp.com",
  databaseURL: "https://final-todo-9ac56-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "final-todo-9ac56",
  storageBucket: "final-todo-9ac56.appspot.com",
  messagingSenderId: "225392690428",
  appId: "1:225392690428:web:f047823a12d4a6e422c379",
  measurementId: "G-NLFW0WCJWK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();