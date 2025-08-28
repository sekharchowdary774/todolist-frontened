import React, { useEffect, useState } from "react";
import './Sidebar.css'
const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage (or API later)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <p className="no-user">No user logged in</p>;
  }

  return (
     <div className="profile-container">
      <h1 className="profile-title">👤 Profile</h1>

      <div className="profile-item">
        <label>Username:</label>
        <p>{user.username}</p>
      </div>

      <div className="profile-item">
        <label>Email:</label>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
