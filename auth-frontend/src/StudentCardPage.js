import React from "react";
import StudentCard from "./StudentCard";

export default function StudentCardPage() {
  return (
    <div>
      <StudentCard
        name="Aditi Nikam"
        rollNo="100"
        department="Computer Science"
        email="aditi@example.com"
        year="3rd Year"
      />
    </div>
  );
}