import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Inicializa el objeto auth
const auth = getAuth();

export const loginUser = async (email, password) => {
  try {
    // Autenticación del usuario
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error("Error autenticando al usuario de Firebase:", error);
    return false;
  }
};