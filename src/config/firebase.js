import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider } from "firebase/auth"
import { getStorage} from "firebase/storage"

//change to this enki acc
const firebaseConfig = {
  apiKey: "AIzaSyD_twJNidomc19mXGN14fXj2IsHc4Y1drI",
  authDomain: "photoscope-9adcb.firebaseapp.com",
  projectId: "photoscope-9adcb",
  storageBucket: "photoscope-9adcb.appspot.com",
  messagingSenderId: "584763220665",
  appId: "1:584763220665:web:b5902cee0b27252b153168",
  measurementId: "G-JFKX9MP705"
};

//test
// const firebaseConfig = {
//   apiKey: "AIzaSyCNJW0a_aUlq5010D3gNHir2sazWcyGbO8",
//   authDomain: "test-8ba60.firebaseapp.com",
//   projectId: "test-8ba60",
//   storageBucket: "test-8ba60.appspot.com",
//   messagingSenderId: "359342729237",
//   appId: "1:359342729237:web:2b7279ca62e0c28bf7861c"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const storage = getStorage()
