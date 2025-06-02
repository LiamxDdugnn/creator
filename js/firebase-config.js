// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYCYLOUbgP3_PZrLDvNg-1_dm4vxcomKU",
  authDomain: "liam-tdu.firebaseapp.com",
  projectId: "liam-tdu",
  storageBucket: "liam-tdu.firebasestorage.app",
  messagingSenderId: "69285157804",
  appId: "1:69285157804:web:4057dce4b8744414ddf809",
  measurementId: "G-L42GYK7JMX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
