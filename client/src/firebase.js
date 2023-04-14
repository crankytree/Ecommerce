import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC153RjsQr9w3AlnIixDbIE3mUNtY_mcF8",
  authDomain: "ecommerce-58936.firebaseapp.com",
  projectId: "ecommerce-58936",
  storageBucket: "ecommerce-58936.appspot.com",
  messagingSenderId: "827359618583",
  appId: "1:827359618583:web:f585eb5cb7d67ea6db9e52"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();