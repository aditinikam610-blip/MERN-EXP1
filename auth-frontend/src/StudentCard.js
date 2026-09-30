import React, { useState } from "react";

export default function StudentCard(props) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      style={{
        width: "350px",
        padding: "20px",
        margin: "30px auto",
        border: "1px solid #ccc",
        borderRadius: "10px"
      }}
    >
      <h2>Student Information</h2>

      <p>
        <strong>Name:</strong> {props.name}
      </p>

      <p>
        <strong>Roll No:</strong> {props.rollNo}
      </p>

      <p>
        <strong>Department:</strong> {props.department}
      </p>

      {showDetails && (
        <div>
          <p>
            <strong>Email:</strong> {props.email}
          </p>

          <p>
            <strong>Year:</strong> {props.year}
          </p>
        </div>
      )}

      <button
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
    </div>
  );
}