import React from "react";
import { Link } from "react-router-dom";

const RegisterForm = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  university,
  setUniversity,
  department,
  setDepartment,
  errorMessage,
  isRegistering,
  onSubmit,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        required
      />
      <input
        type="text"
        value={university}
        onChange={(e) => setUniversity(e.target.value)}
        placeholder="University/College"
        required
      />
     <select
  className="scrollable-dropdown"
  value={department}
  onChange={(e) => setDepartment(e.target.value)}
  required
>
  <option value="" disabled>
    Select Department
  </option>
  <option value="Computer Science">Computer Science</option>
  <option value="Electrical Engineering">Electrical Engineering</option>
  <option value="Mechanical Engineering">Mechanical Engineering</option>
  <option value="Civil Engineering">Civil Engineering</option>
  <option value="Business Administration">Business Administration</option>
  <option value="Mathematics">Mathematics</option>

</select>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="submit" disabled={isRegistering}>
        {isRegistering ? "Registering..." : "Register"}
      </button>
      <div className="login-link">
        <p>
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
