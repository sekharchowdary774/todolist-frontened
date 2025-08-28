import React from 'react'
import { useNavigate } from "react-router-dom";
import './home.css';

const Home = () => {
    const navigate=useNavigate();

  return (
    <div className="home-main">
  <div className="auth-buttons">
    <button onClick={() => navigate("/login")} className='login'>Login</button>
        <button onClick={() => navigate("/register")} className='register'>Register</button>
     
  </div>
  
  {/* Other content stays unaffected */}
  <div className="content">
    <h1>Welcome to my Todolist website</h1>
    <button onClick={() => navigate("/register")} className="cta-btn">Get Started</button>
    
  </div>
</div>

  );
}

export default Home;