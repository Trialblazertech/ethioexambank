// utils/validate.js

export const validateRegisterForm = ({ email, password, confirmPassword, university, department }) => {
    const errors = [];
  
    if (!email || !email.includes("@")) {
      errors.push("Please enter a valid email address.");
    }
  
    if (!university) {
      errors.push("Please select a university/college.");
    }
  
    if (!department) {
      errors.push("Please select a department.");
    }
  
    if (!password || password.length < 6) {
      errors.push("Password should be at least 6 characters long.");
    }
  
    if (password !== confirmPassword) {
      errors.push("Passwords do not match.");
    }
  
    return errors;
  };
  