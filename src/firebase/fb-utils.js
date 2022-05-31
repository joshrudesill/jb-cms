import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { doc, setDoc } from "firebase/firestore"; 
var firebaseui = require('firebaseui');

const firebaseConfig = {
  apiKey: "AIzaSyAY-ONJ14CpitYenWWi5d0xy6HPiTUTYXQ",
  authDomain: "jb-react.firebaseapp.com",
  projectId: "jb-react",
  storageBucket: "jb-react.appspot.com",
  messagingSenderId: "772965123821",
  appId: "1:772965123821:web:0306b373d328877cfdeee4",
  measurementId: "G-EB19EW2FX0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const sendData = async data => {
  await setDoc(doc(db, 'sitedata', 'test'), data);
}


