import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider } from "firebase/auth"
import { getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD_twJNidomc19mXGN14fXj2IsHc4Y1drI",
  authDomain: "photoscope-9adcb.firebaseapp.com",
  projectId: "photoscope-9adcb",
  storageBucket: "photoscope-9adcb.appspot.com",
  messagingSenderId: "584763220665",
  appId: "1:584763220665:web:b5902cee0b27252b153168",
  measurementId: "G-JFKX9MP705"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const storage = getStorage()
