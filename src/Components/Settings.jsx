import { useState, useEffect } from "react";
import "./Settings.css";

function Settings() {
  
  const [user, setUser] = useState(() => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
});
// store full user object
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  // Load user from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      setUsername(savedUser.username); // prefill
    }
  }, []);

  // Apply theme whenever it changes
  

  const saveChanges = async () => {
    if (!user) return alert("No user logged in");

    try {
      const res = await fetch(`https://todolist-backened-1-f47f.onrender.com/update_user/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Changes saved!");

        // update user info in localStorage
        const updatedUser = { ...user, username: username };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        alert(data.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const deleteAccount = async () => {
    if (!user) return alert("No user logged in");
    if (!window.confirm("⚠️ Are you sure you want to delete your account?")) return;

    try {
      const res = await fetch(`https://todolist-backened-1-f47f.onrender.com/delete_user/${user.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        alert("Account deleted!");
        localStorage.clear();
        window.location.href = "/login"; // redirect to login
      } else {
        alert(data.error || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="main-layout">
      <div className="content">
        {user ? (
          <>
            

            {/* Username */}
            <div className="form-group">
              <label>Change Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Change Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            

            {/* Buttons */}
            <div className="button-group">
              <button onClick={saveChanges}>Save Changes</button>
              <button className="delete-btn" onClick={deleteAccount}>
                Delete Account
              </button>
            </div>
          </>
        ) : (
          <p>No user logged in.</p>
        )}
      </div>
    </div>
  );
}

export default Settings;
