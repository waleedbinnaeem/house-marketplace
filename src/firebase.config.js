import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSQtQfgW3jlSfDYLdOZ7xTvwmOntvm8r8",
  authDomain: "house-marketplace-app-dbfec.firebaseapp.com",
  projectId: "house-marketplace-app-dbfec",
  storageBucket: "house-marketplace-app-dbfec.appspot.com",
  messagingSenderId: "139699250988",
  appId: "1:139699250988:web:2e5b7b44cc547ad6ceee89",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

export const db = getFirestore();
