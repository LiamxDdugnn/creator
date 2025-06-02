import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBM98U7dEV8jvUQ0nmw_GqG4gmI7UPuCGU",
  authDomain: "dearlove-spark.firebaseapp.com",
  projectId: "dearlove-spark",
  storageBucket: "dearlove-spark.appspot.com",
  messagingSenderId: "98130036485",
  appId: "1:98130036485:web:548c3526f4e93109ed9f2b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
