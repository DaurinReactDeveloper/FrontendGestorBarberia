// src/util/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCTW7PypDBUz50_yQ7maxZlAn1CVPobi90",
  authDomain: "gestorbarberia.firebaseapp.com",
  projectId: "gestorbarberia",
  storageBucket: "gestorbarberia.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
};

// Inicializa la aplicación
const app = initializeApp(firebaseConfig);

// Inicializa Auth y Storage
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
