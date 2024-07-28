import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// 파이어 베이스에서 키 받아오는 부분

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const ProfileImgUpload = {
  apiKey: "AIzaSyCJY-5t1sZ8M1PHKOPAFEaE2ZVIqSfeuVM",
  authDomain: "dionysus-7d43e.firebaseapp.com",
  projectId: "dionysus-7d43e",
  storageBucket: "dionysus-7d43e.appspot.com",
  messagingSenderId: "287785263948",
  appId: "1:287785263948:web:ed2ee6fd0aed0b689d25e9",
  measurementId: "G-MZZ0VW0XKV",
};

// Initialize Firebase
firebase.initializeApp(ProfileImgUpload);
export const storage = firebase.storage();
