import { db, storage } from "./firebase-config.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const form = document.getElementById("galaxyForm");
const result = document.getElementById("result");
const resultLink = document.getElementById("resultLink");
const qrContainer = document.getElementById("qrCode");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const messages = document.getElementById("messages").value.trim().split("\n");
  const color = document.getElementById("loveColor").value;
  const files = document.getElementById("images").files;

  const imageUrls = [];

  for (let file of files) {
    const fileRef = ref(storage, `images/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    imageUrls.push(url);
  }

  const docRef = await addDoc(collection(db, "galaxies"), {
    messages,
    color,
    images: imageUrls,
    createdAt: serverTimestamp()
  });

  const link = `${location.origin}/MuaDongToky.html?id=${docRef.id}`;
  resultLink.textContent = link;

  // QR Code
  const qr = new QRCodeStyling({
    width: 200,
    height: 200,
    data: link,
    imageOptions: { crossOrigin: "anonymous", margin: 10 }
  });
  qrContainer.innerHTML = "";
  qr.append(qrContainer);

  result.style.display = "block";
});
