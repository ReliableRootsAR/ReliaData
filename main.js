import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "",
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
const auth = getAuth(app);

// Elements
const dataList = document.getElementById("data-list");
const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");
const userInfo = document.getElementById("userInfo");
const filterInput = document.getElementById("filterInput");

// Authentication
const provider = new GoogleAuthProvider();

// Login function
loginButton.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then(result => {
            const user = result.user;
            console.log(`Logged in as: ${user.displayName}`);
        })
        .catch(error => {
            console.error("Login failed:", error);
        });
});

// Logout function
logoutButton.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            console.log("Logged out successfully.");
        })
        .catch(error => {
            console.error("Logout failed:", error);
        });
});

// Monitor auth state
onAuthStateChanged(auth, (user) => {
    if (user) {
        userInfo.textContent = `Logged in as: ${user.displayName}`;
        fetchData(); // Fetch data after login
    } else {
        userInfo.textContent = "Not logged in.";
        dataList.innerHTML = ""; // Clear data if logged out
    }
});

// Fetch data from Firestore
async function fetchData() {
    dataList.innerHTML = ""; // Clear existing data
    const snapshot = await getDocs(collection(db, "uploadedFiles"));
    snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement("li");
        li.textContent = `${doc.id}: ${JSON.stringify(data)}`;
        dataList.appendChild(li);
    });
}

// Filter data
filterInput.addEventListener("input", (e) => {
    const filter = e.target.value.toLowerCase();
    const items = dataList.getElementsByTagName("li");
    for (let item of items) {
        if (item.textContent.toLowerCase().includes(filter)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    }
});
