import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Home from "./admin/Home";
import ClosedTickets from "./admin/ClosedTickets";
import OpenTickets from "./admin/OpenTickets";
import ResolvedTickets from "./admin/ResolvedTickets";

function AdminDashboard() {
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
            <NavLink onClick={() => setComp("open")}>Open Tickets</NavLink>
          </li>
          <li>
            <NavLink onClick={() => setComp("closed")}>Closed Ticket</NavLink>
          </li>
          <li>
            <NavLink onClick={() => setComp("resolved")}>
              Resolved Ticket
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleLogout} to="/login">
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>
        {comp === "home" ? (
          <Home />
        ) : comp === "closed" ? (
          <ClosedTickets />
        ) : comp === "open" ? (
          <OpenTickets />
        ) : comp === "resolved" ? (
          <ResolvedTickets />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
