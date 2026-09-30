import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Home Page</h1>

      <p>Welcome to the React Router Experiment.</p>

      <Link to="/about">
        <button>About</button>
      </Link>

      <Link to="/students">
        <button style={{ marginLeft: "10px" }}>
          Students
        </button>
      </Link>

      <Link to="/student-card">
      <button style={{ marginLeft: "10px" }}>
          Student Card
      </button>
      </Link>
    </div>
  );
}