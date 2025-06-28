import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBe170SmAzy2tHTcwtLKyOHlBIaBPZ_IA0",
  authDomain: "karmapass-ecfd4.firebaseapp.com",
  databaseURL: "https://karmapass-ecfd4-default-rtdb.firebaseio.com",
  projectId: "karmapass-ecfd4",
  storageBucket: "karmapass-ecfd4.firebasestorage.app",
  messagingSenderId: "791639476692",
  appId: "1:791639476692:web:d3be2576e38e20a102ee41",
  measurementId: "G-V86ZWG80CR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);