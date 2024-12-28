import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Initialize Firestore
const db = getFirestore();

// Function to add user data to Firestore
export const addUserToFirestore = async (email, university, department, role = "free") => {
  const auth = getAuth();
  const user = auth.currentUser; // Get the current logged-in user
  
  if (user) {
    try {
      // Logging to check if user is authenticated and valid
      console.log("Authenticated user UID:", user.uid);

      // Ensure we're targeting the right collection
      const userCollectionRef = collection(db, "users");

      // Add the user document to Firestore
      const docRef = await addDoc(userCollectionRef, {
        uid: user.uid,
        email: email,
        university: university,
        department: department,
        role: role,
        createdAt: new Date(),
      });

      // Log success message with the document reference
      console.log("User data added to Firestore with ID:", docRef.id);
    } catch (error) {
      // Log error to help with debugging
      console.error("Error adding user data to Firestore: ", error);
    }
  } else {
    console.error("No user found!");
  }
};
