import { Route, Routes } from "react-router";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/student" element={<StudentDashboard />}></Route>
        <Route path="/admin" element={<AdminDashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
