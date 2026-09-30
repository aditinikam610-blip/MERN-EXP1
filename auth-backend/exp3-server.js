const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.join(__dirname, ".env.exp3")
});

const app = express();

// Middleware
app.use(express.json());

// Custom logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Temporary student data
let students = [
  {
    id: 1,
    name: "Rahul",
    department: "Computer Science"
  },
  {
    id: 2,
    name: "Priya",
    department: "Mechanical"
  },
  {
    id: 3,
    name: "Amit",
    department: "Electronics"
  }
];

// 1. Basic route
app.get("/api/hello", (req, res) => {
  res.status(200).json({
    message: `Hello from ${process.env.APP_NAME}`
  });
});

// 2. GET all students + query parameter
app.get("/api/students", (req, res) => {
  const { department } = req.query;

  let result = students;

  if (department) {
    result = students.filter(
      (student) =>
        student.department.toLowerCase() ===
        department.toLowerCase()
    );
  }

  res.status(200).json(result);
});

// 3. Route parameter
app.get("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      message: "Student ID must be a number"
    });
  }

  const student = students.find(
    (student) => student.id === id
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  res.status(200).json(student);
});

// 4. POST - create student
app.post("/api/students", (req, res) => {
  const { name, department } = req.body;

  if (!name || !department) {
    return res.status(400).json({
      message: "Name and department are required"
    });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    department
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

// 5. Test error handling
app.get("/api/test-error", (req, res, next) => {
  next(new Error("This is a test error"));
});

// Static content
app.use(
  "/static",
  express.static(path.join(__dirname, "exp3-public"))
);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(500).json({
    message: "Internal server error"
  });
});

// Start server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});