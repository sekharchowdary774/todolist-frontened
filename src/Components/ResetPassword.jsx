import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { email } = useParams();   // get email from URL
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        alert("Password updated successfully! Please login.");
        navigate("/login");
      } else {
        alert(data.error || "Failed to reset password.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box reset">
        <form onSubmit={handleReset} autoComplete="off">
          <h1>Set New Password</h1>
          <p>Email: <b>{email}</b></p>
          <div className="input-box">
            <input 
              type="password" 
              placeholder="Enter new password" 
              value={password} 
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
