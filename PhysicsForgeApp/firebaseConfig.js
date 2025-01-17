import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAWNu2V1dFv-7c2qcY0VwYr-w0focmxviA",
    authDomain: "pawm-bisa.firebaseapp.com",
    projectId: "pawm-bisa",
    storageBucket: "pawm-bisa.firebasestorage.app",
    messagingSenderId: "284535622253",
    appId: "1:284535622253:web:7cd5186597eccd5b848d64",
    measurementId: "G-06VM81F77Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Firebase Initialized:", app);
console.log("Auth Object:", auth);

export { auth };
