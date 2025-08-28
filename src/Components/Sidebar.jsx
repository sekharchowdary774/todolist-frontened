import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user");
      navigate("/"); // ✅ stays inside SPA
      alert("Logged out!");
    }
  };

  return (
    <div className="sidebar">
      <ul className="list">
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/todo">Tasks</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li onClick={handleLogout} className="logout">
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
