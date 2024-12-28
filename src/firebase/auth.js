// Import Firebase Auth functions
import { auth } from './firebase';  // Make sure you have initialized Firebase
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, // Add this import
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

// Export the functions
export const doCreateUserWithEmailAndPassword = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const doSignInWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  // add user to firestore
};

export const doSignOut = () => signOut(auth);

export const doPasswordReset = (email) => sendPasswordResetEmail(auth, email);

export const doPasswordChange = (password) => updatePassword(auth.currentUser, password);

export const doSendEmailVerification = () =>
  sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });

// Export onAuthStateChanged
export { onAuthStateChanged };
