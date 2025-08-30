import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "./Api";
import "./login.css";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const data = await registerUser( username, email, password); // ✅ pass object
      if (data.message) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Register failed:", err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="form-box register">
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <div className="input-box">
          <input type="text" name="username" autoComplete="off" placeholder="Username" required />
        </div>
        <div className="input-box">
          <input type="email" name="email" autoComplete="off" placeholder="Email" required />
        </div>
        <div className="input-box">
          <input type="password" name="password" autoComplete="off" placeholder="Password" required />
        </div>
        <div className="remember">
          <label>
            <input type="checkbox" required /> I agree to the terms & conditions
          </label>
        </div>
        <button type="submit">Register</button>
        <div className="register">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
