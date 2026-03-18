import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAARdjzSUNEjs9_fSiDtnXu9LzOnVpLzQ",
  authDomain: "controle-vigilantes.firebaseapp.com",
  projectId: "controle-vigilantes",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
