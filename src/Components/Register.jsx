import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./Api"; // only using register here
import "./login.css";

const Register = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  // ✅ Register
  const handleRegister = async (e) => {
    e.preventDefault();
    alert("Registering... please wait."); // instant response

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const data = await registerUser(username, email, password);
      if (data.message) {
        alert("Registration successful! Please login.");
        setIsRegistering(false);
        navigate("/todo");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Register failed:", err);
      alert("Server error. Please try again.");
    }
  };

  // ✅ Proper return
  return (
    <>
      {/* 🔹 Register Form */}
      <div className="form-box register">
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
            />
          </div>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="remember">
            <label>
              <input type="checkbox" /> I agree to the terms & conditions
            </label>
          </div>
          <button type="submit">Register</button>
          <div className="register">
            <p>
              Already have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsRegistering(false);
                  navigate("/"); // navigate back to login page if you want
                }}
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
