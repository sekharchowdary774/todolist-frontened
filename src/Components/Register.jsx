import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "./Api";
import "./login.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent double click
    setLoading(true);
    setMessage("Registering... please wait");

    const formData = new FormData(e.target);
    const username = formData.get("username")?.trim();
    const email = formData.get("email")?.trim();
    const password = formData.get("password");

    try {
      // race request vs timeout
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 10000)
      );

      const data = await Promise.race([
        registerUser(username, email, password),
        timeoutPromise,
      ]);

      if (data.success || data.message) {
        setMessage("✅ Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(data.error || "❌ Registration failed");
      }
    } catch (err) {
      console.error("Register failed:", err);
      if (err.message === "Request timed out") {
        setMessage("⏳ Server is taking too long. Please try again.");
      } else {
        setMessage("⚠️ Server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-box register">
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <div className="input-box">
          <input type="text" name="username" placeholder="Username" required disabled={loading} />
        </div>
        <div className="input-box">
          <input type="email" name="email" placeholder="Email" required disabled={loading} />
        </div>
        <div className="input-box">
          <input type="password" name="password" placeholder="Password" required disabled={loading} />
        </div>
        <div className="remember">
          <label>
            <input type="checkbox" required disabled={loading} /> I agree to the terms & conditions
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="register">
          <p>
            Already have an account?{" "}
            <Link to="/login" onClick={(e) => loading && e.preventDefault()}>
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
