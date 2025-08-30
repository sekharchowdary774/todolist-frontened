import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser, requestPasswordReset } from "./Api"; // API calls
import "./login.css";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showReset, setShowReset] = useState(false); // for reset form
  const navigate = useNavigate();

  // ✅ Login
  const handleLogin = async (e) => {
    e.preventDefault();
    alert("Logging in... please wait."); // instant response

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const data = await loginUser(username, password);
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert(data.message);
        navigate("/todo");
      } else {
        alert(data.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Server error. Please try again.");
    }
  };

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
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Register failed:", err);
      alert("Server error. Please try again.");
    }
  };

  // ✅ Reset password
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    alert("Sending reset link..."); // instant response

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
    <div className={`wrapper ${isRegistering ? "active" : ""}`}>
      {showReset ? (
        // 🔹 Reset Password Form
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
                  }}
                >
                  Back to Login
                </a>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <>
          {/* 🔹 Login Form */}
          <div className="form-box login">
            <form onSubmit={handleLogin} autoComplete="off">
              <h1>Login</h1>
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
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="remember">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowReset(true);
                  }}
                >
                  Forgot Password?
                </a>
              </div>
              <button type="submit">Login</button>
              <div className="register">
                <p>
                  Don't have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegistering(true);
                    }}
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>

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
                  <input type="checkbox" />I agree to the terms & conditions
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
                    }}
                  >
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
