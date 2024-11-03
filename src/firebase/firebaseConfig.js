// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics  } from "firebase/analytics";
import { getFirestore , } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2sewZ82kgngGXqylix0VZfGICmWLcIDQ",
  authDomain: "my-proyecto-f72d5.firebaseapp.com",
  projectId: "my-proyecto-f72d5",
  storageBucket: "my-proyecto-f72d5.appspot.com",
  messagingSenderId: "794030612812",
  appId: "1:794030612812:web:c75da2899e53a9a34fefe9",
  measurementId: "G-HHCXELJ7GT"
};
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
