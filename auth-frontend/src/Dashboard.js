import React, { useEffect, useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [me, setMe] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    api.get("/profile/me")
      .then((res) => {
        setMe(res.data);
      })
      .catch(() => {
        alert("Session expired. Please login again.");
        handleLogout();
      });
  }, []);

  if (!me) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        Welcome {me.name}
      </h2>

      <p>Email: {me.email}</p>
      <p>Role: {me.role}</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}