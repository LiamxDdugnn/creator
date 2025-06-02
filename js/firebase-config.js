import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore, collection, addDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDe3-vuNDGJ_DxXjRV4kX91cvUy9EXwFFo",
  authDomain: "dearlove-demo.firebaseapp.com",
  projectId: "dearlove-demo",
  storageBucket: "dearlove-demo.appspot.com",
  messagingSenderId: "469241383255",
  appId: "1:469241383255:web:bc4e7e6f73e12aa1375d59"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, collection, addDoc, storage, ref, uploadBytes, getDownloadURL };
