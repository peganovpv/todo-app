// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBdIMEZ15BOTSd45ygM_rWMZZu1gZLITzo",
  authDomain: "todo-app-2f02c.firebaseapp.com",
  databaseURL: "https://todo-app-2f02c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-app-2f02c",
  storageBucket: "todo-app-2f02c.appspot.com",
  messagingSenderId: "289164469626",
  appId: "1:289164469626:web:50cb48b3fc5f8499a862c3",
  measurementId: "G-JCLKRESGSR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };