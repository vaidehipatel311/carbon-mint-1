import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWKeWlzMRHXEejB4PE-2d23CfCw05IywQ",
  authDomain: "carbon-mint-1ac52.firebaseapp.com",
  projectId: "carbon-mint-1ac52",
  storageBucket: "carbon-mint-1ac52.appspot.com",
  messagingSenderId: "148494697033",
  appId: "1:148494697033:web:3ff9e9aa37353680e6f598"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);