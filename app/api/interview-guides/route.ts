import { NextResponse } from "next/server"

const guides = [
  {
    id: 1,
    title: "Technical Interview Fundamentals",
    description:
      "Master the basics of technical interviews including data structures, algorithms, and problem-solving strategies.",
    duration: "4 hours",
    difficulty: "Beginner",
    rating: 4.8,
    students: 12500,
    topics: ["Data Structures", "Algorithms", "Problem Solving", "Time Complexity"],
    sections: [
      {
        id: 1,
        title: "Introduction to Technical Interviews",
        duration: "30 min",
        completed: true,
      },
      {
        id: 2,
        title: "Data Structures Overview",
        duration: "60 min",
        completed: true,
      },
      {
        id: 3,
        title: "Algorithm Fundamentals",
        duration: "90 min",
        completed: false,
      },
    ],
  },
]

export async function GET() {
  return NextResponse.json({ guides })
}
