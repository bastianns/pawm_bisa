import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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
export const db = getFirestore(app);
export const auth = getAuth(app);
