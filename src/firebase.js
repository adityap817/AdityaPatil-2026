import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA2OSky6RxAdXJnHF1U8laxWlsVWHGVSa4",
    authDomain: "adityapatil-2026.firebaseapp.com",
    projectId: "adityapatil-2026",
    storageBucket: "adityapatil-2026.firebasestorage.app",
    messagingSenderId: "14800066309",
    appId: "1:14800066309:web:dfd8f4562df05e8e93096c",
    measurementId: "G-EMY15DZQM4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
