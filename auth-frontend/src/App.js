import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Students from "./Students";
import StudentCardPage from "./StudentCardPage";

// Experiment 5
import About from "./About";
import StudentDetail from "./StudentDetail";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to LMS System</h1>

      <p>React Router and Hooks Experiment</p>

      <Link to="/about">
        <button style={{ margin: "10px" }}>
          About
        </button>
      </Link>

      <Link to="/students">
        <button style={{ margin: "10px" }}>
          Students
        </button>
      </Link>

      <br />

      <Link to="/login">
        <button style={{ margin: "10px" }}>
          Login
        </button>
      </Link>

      <Link to="/register">
        <button style={{ margin: "10px" }}>
          Register
        </button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Experiment 5 */}
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/students" element={<Students />} />

        <Route
          path="/students/:id"
          element={<StudentDetail />}
        />

        {/* Experiment 7 */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/student-card"
  element={<StudentCardPage />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;