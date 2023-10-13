import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider } from "firebase/auth"
import { getStorage} from "firebase/storage"


//main
const firebaseConfig = {
  apiKey: "AIzaSyBCbKKrqD1FzpP0EX9d9tFdMIlzfdvYy38",
  authDomain: "anotherfitness-9da5d.firebaseapp.com",
  projectId: "anotherfitness-9da5d",
  storageBucket: "anotherfitness-9da5d.appspot.com",
  messagingSenderId: "173977706291",
  appId: "1:173977706291:web:4f1958c4cd868fa48fe846",
  measurementId: "G-GGX6VCXD90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const storage = getStorage()
