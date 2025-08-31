import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, requestPasswordReset } from "./Api";
import "./login.css";

const Login = () => {
  const [showReset, setShowReset] = useState(false);
  const [message, setMessage] = useState(""); // ✅ Fixed missing message state
  const [isLoading, setIsLoading] = useState(false); // ✅ Added loading state
  const navigate = useNavigate();

  // ✅ Fixed Login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (isLoading) return; // Prevent multiple submissions
    
    setIsLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const data = await loginUser(username, password);
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert(data.message || "Login successful!");
        navigate("/todo");
      } else {
        alert(data.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Fixed Reset Password
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");

    try {
      const data = await requestPasswordReset(email);
      if (data.success) {
        navigate(`/reset/${email}`);
      } else {
        alert(data.error || "Unable to send reset link.");
      }
    } catch (err) {
      console.error("Reset failed:", err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="wrapper">
      {message && <p className="message">{message}</p>}
      {showReset ? (
        <div className="form-box reset">
          <form onSubmit={handlePasswordReset} autoComplete="off">
            <h1>Reset Password</h1>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <button type="submit">Send Reset Link</button>
            <div className="register">
              <p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowReset(false);
                    setMessage("");
                  }}
                >
                  Back to Login
                </a>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className="form-box login">
          <form onSubmit={handleLogin} autoComplete="off">
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Username"
                disabled={isLoading}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                disabled={isLoading}
                required
              />
            </div>
            <div className="remember">
              <label>
                <input type="checkbox" disabled={isLoading} /> Remember me
              </label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowReset(true);
                  setMessage("");
                }}
              >
                Forgot Password?
              </a>
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <div className="register">
              <p>
                Don't have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/register");
                  }}
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;