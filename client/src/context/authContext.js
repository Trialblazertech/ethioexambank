// // authContext.js
// import React, { createContext, useState, useEffect, useContext } from "react";
// import { auth } from "../firebase/firebase"; // Import the auth functions from firebase.js
// import { onAuthStateChanged } from "firebase/auth";

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [userLoggedIn, setUserLoggedIn] = useState(null);

//   // Listen for changes in authentication state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUserLoggedIn(user); // Sets the user if logged in or null if logged out
//     });
//     return unsubscribe; // Cleanup the listener on component unmount
//   }, []);

//   return (
//     <AuthContext.Provider value={{ userLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };// src/context/authContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means not logged in

  const login = (userData) => setUser(userData); // Simulate login
  const logout = () => setUser(null); // Simulate logout

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


