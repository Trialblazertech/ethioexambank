// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4CUrsGMlfAU49eYZ-OiK_XqtnpjV8OB4",
  authDomain: "ethioexambank2024.firebaseapp.com",
  projectId: "ethioexambank2024",
  storageBucket: "ethioexambank2024.firebasestorage.app",
  messagingSenderId: "878800004470",
  appId: "1:878800004470:web:126397d878a919bc688657",
  measurementId: "G-G31XY6Z7BQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to sign in with email and password
export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;  // Return the user information after a successful login
  } catch (error) {
    throw new Error(error.message);  // Handle any errors during sign-in
  }
};

// Function to sign in with Google
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;  // Return the signed-in user
  } catch (error) {
    throw new Error(error.message);  // Handle any errors during Google sign-in
  }
};

// Function to sign out
export const doSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);  // Handle errors if sign-out fails
  }
};

// Export initialized Firebase app and auth
export { auth, app };
