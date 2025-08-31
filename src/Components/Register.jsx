import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "./Api";
import "./login.css";

const Register = () => {
  const [message, setMessage] = useState(""); // ✅ Added message state
  const [isLoading, setIsLoading] = useState(false); // ✅ Added loading state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (isLoading) return; // Prevent multiple submissions
    
    setIsLoading(true);
    setMessage(""); // Clear previous messages

    const formData = new FormData(e.target);
    const username = formData.get("username")?.trim();
    const email = formData.get("email")?.trim();
    const password = formData.get("password");

    // Basic validation
    if (!username || !email || !password) {
      setMessage("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Password strength validation
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // ✅ Add timeout to prevent hanging requests
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const data = await Promise.race([
        registerUser(username, email, password),
        timeoutPromise
      ]);

      if (data.message || data.success) {
        setMessage("Registration successful! Redirecting to login...");
        // ✅ Small delay for user feedback before navigation
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Register failed:", err);
      if (err.message === 'Request timeout') {
        setMessage("Registration is taking too long. Please check your connection and try again.");
      } else if (err.message && err.message.includes('already exists')) {
        setMessage("Username or email already exists. Please try different credentials.");
      } else {
        setMessage("Server error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper">
      {message && (
        <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
      <div className="form-box register">
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <div className="input-box">
            <input 
              type="text" 
              name="username" 
              autoComplete="off" 
              placeholder="Username" 
              disabled={isLoading}
              required 
            />
          </div>
          <div className="input-box">
            <input 
              type="email" 
              name="email" 
              autoComplete="off" 
              placeholder="Email" 
              disabled={isLoading}
              required 
            />
          </div>
          <div className="input-box">
            <input 
              type="password" 
              name="password" 
              autoComplete="new-password" 
              placeholder="Password (min 6 characters)" 
              disabled={isLoading}
              required 
            />
          </div>
          <div className="remember">
            <label>
              <input type="checkbox" disabled={isLoading} required /> 
              I agree to the terms & conditions
            </label>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
          <div className="register">
            <p>
              Already have an account? {" "}
              <Link 
                to="/login" 
                onClick={(e) => {
                  if (isLoading) {
                    e.preventDefault();
                  }
                }}
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;