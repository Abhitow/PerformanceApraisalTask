import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyB4ESkE8uHzxsW5HxDS3x_ECt27OG5DOc0",
  authDomain: "skein-tech.firebaseapp.com",
  projectId: "skein-tech",
  storageBucket: "skein-tech.appspot.com",
  messagingSenderId: "670547065676",
  appId: "1:670547065676:web:79f898d41c995004902de9",
  measurementId: "G-90121JPYMS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider =new GoogleAuthProvider();

export {auth , provider};