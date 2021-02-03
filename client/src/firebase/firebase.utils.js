import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBltgDzPjTfV4-WC8NAMTKk2ZCfea1NzUA",
  authDomain: "ecommerce-11ec7.firebaseapp.com",
  projectId: "ecommerce-11ec7",
  storageBucket: "ecommerce-11ec7.appspot.com",
  messagingSenderId: "890219198901",
  appId: "1:890219198901:web:1a8e7d5fdfcb92fef4c1fc"
};

// Firebase initialization
firebase.initializeApp(config);


// Firebase can be used
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


