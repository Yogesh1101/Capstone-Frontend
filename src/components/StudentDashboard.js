import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CreateTicket from "./student/CreateTicket";
import Home from "./student/Home";

function StudentDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [comp, setComp] = useState("home");
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
  }, []);
  return (
    <div>
      <nav>
        <Link to="/student" className="title">
          DASHBOARD
        </Link>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink onClick={() => setComp("home")}>Home</NavLink>
          </li>
          <li>
            <NavLink onClick={() => setComp("create")}>Create Ticket</NavLink>
          </li>
          <li>
            <NavLink onClick={handleLogout} to="/login">
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>
        {comp === "home" ? <Home /> : comp === "create" ? <CreateTicket /> : ""}
      </div>
    </div>
  );
}

export default StudentDashboard;
