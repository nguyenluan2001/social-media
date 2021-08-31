// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZF63jaHJPJFKfcGokjBiYd7BLn7ds7UQ",
  authDomain: "social-media-4d566.firebaseapp.com",
  projectId: "social-media-4d566",
  storageBucket: "social-media-4d566.appspot.com",
  messagingSenderId: "783874042807",
  appId: "1:783874042807:web:f15ef60d4bb71f3f55d632"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);
export {storage}