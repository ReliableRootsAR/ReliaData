import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "reliadata-52116.firebaseapp.com",
    projectId: "reliadata-52116",
    storageBucket: "reliadata-52116.appspot.com",
    messagingSenderId: "693785319181",
    appId: "1:693785319181:web:340cbc453b52e525708244",
    measurementId: "G-TG4BRNH88B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch data from Firestore
async function fetchData() {
    const dataList = document.getElementById("data-list");
    const snapshot = await getDocs(collection(db, "uploadedFiles"));
    snapshot.forEach(doc => {
        const li = document.createElement("li");
        li.textContent = `${doc.id}: ${JSON.stringify(doc.data())}`;
        dataList.appendChild(li);
    });
}

fetchData();
