import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgOuGvX1srRO4yHCH9758mVNkFUpRIa7Y",
  authDomain: "zassenkuma-slot-tracker.firebaseapp.com",
  projectId: "zassenkuma-slot-tracker",
  storageBucket: "zassenkuma-slot-tracker.firebasestorage.app",
  messagingSenderId: "606103307578",
  appId: "1:606103307578:web:7f85929313740f5f583c03",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
