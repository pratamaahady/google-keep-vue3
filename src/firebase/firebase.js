import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = require("../../firebase.json")
const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);
const analytics = getAnalytics(firebase);

export { firestore, analytics }