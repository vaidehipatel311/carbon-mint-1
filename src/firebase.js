import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB52DDwoH6glIZPhoZIwAoSGzNXtqfra7Q",
  authDomain: "phone-auth-7e808.firebaseapp.com",
  projectId: "phone-auth-7e808",
  storageBucket: "phone-auth-7e808.appspot.com",
  messagingSenderId: "716783724332",
  appId: "1:716783724332:web:0e4f7b98df99c0ca43ae89"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);