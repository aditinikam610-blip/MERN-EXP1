import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./studentApi";

export default function Students() {

  const navigate = useNavigate();
  
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  // Get students from backend when page loads
  useEffect(() => {
    api
      .get("/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  // Add student
  const addStudent = async (e) => {

    e.preventDefault();

    try {
      const response = await api.post("/students", {
        name,
        department
      });

      // Add newly created student to the existing list
      setStudents([...students, response.data]);

      // Clear form
      setName("");
      setDepartment("");
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Could not add student");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Student Management System</h1>

      <form onSubmit={addStudent}>
        <div>
          <label>Name: </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
        </div>

        <br />

        <div>
          <label>Department: </label>
          <input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter department"
            required
          />
        </div>

        <br />

        <button type="submit">
          Add Student
        </button>
      </form>

      <hr />

      <h2>Students</h2>

      {students.map((student, index) => (
  <div
    key={student._id}
    style={{
      marginBottom: "15px",
      padding: "10px",
      border: "1px solid #ccc"
    }}
  >
    <p>
      <strong>{student.name}</strong> - {student.department}
    </p>

    <button
      onClick={() => navigate(`/students/${index + 1}`)}
    >
      View Details
    </button>
  </div>
))}
    </div>
  );
}