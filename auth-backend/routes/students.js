const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();

    res.json(students);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error"
    });
  }
});

// POST a new student
router.post("/", async (req, res) => {
  try {
    const { name, department } = req.body;

    if (!name || !department) {
      return res.status(400).json({
        message: "Name and department are required"
      });
    }

    const student = new Student({
      name,
      department
    });

    await student.save();

    res.status(201).json(student);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;