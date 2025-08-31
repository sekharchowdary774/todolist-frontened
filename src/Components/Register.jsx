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
    <div className="wrapper" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#081b29',
      padding: '20px'
    }}>
      {message && (
        <p className={`message ${message.includes('successful') ? 'success' : 'error'}`} style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          padding: '10px 20px',
          borderRadius: '5px',
          backgroundColor: message.includes('successful') ? '#d4edda' : '#f8d7da',
          color: message.includes('successful') ? '#28a745' : '#dc3545',
          border: `1px solid ${message.includes('successful') ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {message}
        </p>
      )}
      <div className="form-box register" style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '15px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
      }}>
        <form onSubmit={handleRegister}>
          <h1 style={{
            color: '#fff',
            textAlign: 'center',
            marginBottom: '30px',
            fontSize: '2rem'
          }}>Register</h1>
          
          <div className="input-box" style={{ marginBottom: '20px' }}>
            <input 
              type="text" 
              name="username" 
              autoComplete="off" 
              placeholder="Username" 
              disabled={isLoading}
              required 
              style={{
                width: '100%',
                height: '50px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                fontSize: '16px',
                color: '#fff',
                padding: '0 20px',
                outline: 'none'
              }}
            />
          </div>
          
          <div className="input-box" style={{ marginBottom: '20px' }}>
            <input 
              type="email" 
              name="email" 
              autoComplete="off" 
              placeholder="Email" 
              disabled={isLoading}
              required 
              style={{
                width: '100%',
                height: '50px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                fontSize: '16px',
                color: '#fff',
                padding: '0 20px',
                outline: 'none'
              }}
            />
          </div>
          
          <div className="input-box" style={{ marginBottom: '20px' }}>
            <input 
              type="password" 
              name="password" 
              autoComplete="new-password" 
              placeholder="Password (min 6 characters)" 
              disabled={isLoading}
              required 
              style={{
                width: '100%',
                height: '50px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                fontSize: '16px',
                color: '#fff',
                padding: '0 20px',
                outline: 'none'
              }}
            />
          </div>
          
          <div className="remember" style={{ 
            marginBottom: '25px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <label style={{ 
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px'
            }}>
              <input 
                type="checkbox" 
                disabled={isLoading} 
                required 
                style={{ marginRight: '8px' }}
              /> 
              I agree to the terms & conditions
            </label>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              width: '100%',
              height: '50px',
              background: isLoading ? '#666' : 'linear-gradient(45deg, #00abf0, #006e9a)',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#fff',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              marginBottom: '20px',
              opacity: isLoading ? 0.6 : 1
            }}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          
          <div className="register" style={{ textAlign: 'center' }}>
            <p style={{ color: '#fff', margin: 0 }}>
              Already have an account? {" "}
              <Link 
                to="/login" 
                onClick={(e) => {
                  if (isLoading) {
                    e.preventDefault();
                  }
                }}
                style={{
                  color: '#00abf0',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  pointerEvents: isLoading ? 'none' : 'auto',
                  opacity: isLoading ? 0.6 : 1
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