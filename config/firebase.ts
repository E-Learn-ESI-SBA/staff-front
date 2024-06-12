import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "",
  authDomain: "madaurus",
  projectId: "madaurus-c",
  storageBucket: "madaom",
  messagingSenderId: "6862",
  appId: "7",
  measurementId: "1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
