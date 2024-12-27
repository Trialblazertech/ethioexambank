import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addUserToFirestore } from "../../firebase/firebaseServices"; // Import the Firestore service
import RegisterForm from "./registerForm";
import "../css/register.css";
import { getAuth } from "firebase/auth";

const Register = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsRegistering(true);

    try {
      // Create user with email and password using Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Add user data to Firestore (email, university, department)
      await addUserToFirestore(email, university, department);

      // Navigate to the home page after successful registration
      navigate("/");

    } catch (error) {
      setErrorMessage(error.message); // Handle errors during registration
    } finally {
      setIsRegistering(false); // Set registering state to false
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <RegisterForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        university={university}
        setUniversity={setUniversity}
        department={department}
        setDepartment={setDepartment}
        errorMessage={errorMessage}
        isRegistering={isRegistering}
        onSubmit={handleRegister}
      />
    </div>
  );
};

export default Register;
