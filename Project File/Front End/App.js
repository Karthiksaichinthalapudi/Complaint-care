import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/user/HomePage.jsx";
import Login from "./components/common/Login.jsx";
import SignUp from "./components/common/SignUp.jsx";
import Complaint from "./components/user/Complaint.jsx";
import Status from "./components/user/Status.jsx";
import AdminHome from "./components/admin/AdminHome.jsx";
import AgentHome from "./components/agent/AgentHome.jsx";
import UserInfo from "./components/admin/UserInfo.jsx";
import Home from "./components/common/Home.jsx";
import AgentInfo from "./components/admin/AgentInfo.jsx";

function App() {
  const isLoggedIn = !!localStorage.getItem("user");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          {isLoggedIn ? (
            <>
              <Route path="/AgentInfo" element={<AgentInfo />} />
              <Route path="/AgentHome" element={<AgentHome />} />
              <Route path="/UserInfo" element={<UserInfo />} />
              <Route path="/AgentHome" element={<AgentHome />} />
              <Route path="/AdminHome" element={<AdminHome />} />
              <Route path="/Homepage" element={<HomePage />} />
              <Route path="/Complaint" element={<Complaint />} />
              <Route path="/Status" element={<Status />} />
            </>
          ) : (
            <Route to="/Login" />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;