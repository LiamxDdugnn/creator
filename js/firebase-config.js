// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

// ✅ Thay thông tin bên dưới bằng thông tin thật từ Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyD_demo_key",
  authDomain: "your-demo.firebaseapp.com",
  projectId: "your-demo",
  storageBucket: "your-demo.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:demoappid"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Export để dùng ở file script.js
export {
  db,
  collection,
  addDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL
};
