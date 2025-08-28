import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./Components/List";
import Login from "./Components/Login";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import Settings from "./Components/Settings";
import Profile from "./Components/Profile";
import './index.css';

import { TasksProvider } from "./Components/TasksContext"; // ✅ Import context provider
import Home from "./Home";
import ResetPassword from "./Components/ResetPassword";

function Layout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* ✅ Wrap everything with TasksProvider so state is shared */}
      <TasksProvider>
        <Routes>
          {/* Login stays separate */}
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/reset/:email" element={<ResetPassword/>} />
          {/* Pages with Sidebar */}
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/todo"
            element={
              <Layout>
                <List />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <Settings />
              </Layout>
            }
          />
        </Routes>
      </TasksProvider>
    </Router>
  );
}

export default App;
