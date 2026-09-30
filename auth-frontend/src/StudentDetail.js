import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./studentApi";

export default function StudentDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    api
      .get("/students")
      .then((response) => {
        const students = response.data;

        const index = Number(id) - 1;

        if (students[index]) {
          setStudent(students[index]);
        }
      })
      .catch((error) => {
        console.error("Error fetching student:", error);
      });
  }, [id]);

  if (!student) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Student not found</h2>

        <button onClick={() => navigate("/students")}>
          Back to Students
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Student Detail</h1>

      <p>
        <strong>Name:</strong> {student.name}
      </p>

      <p>
        <strong>Department:</strong> {student.department}
      </p>

      <button onClick={() => navigate("/students")}>
        Back to Students
      </button>
    </div>
  );
}