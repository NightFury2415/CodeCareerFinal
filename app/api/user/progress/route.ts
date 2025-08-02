import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId") || "default"

  // Mock user progress data
  const progress = {
    userId,
    problemsSolved: 127,
    globalRank: 1247,
    avgSolveTime: "5:42",
    currentStreak: 28,
    interviewsCompleted: 23,
    avgInterviewScore: 85,
    jobApplications: 8,
    weeklyGoals: {
      codingProblems: { current: 7, target: 10 },
      jobApplications: { current: 3, target: 5 },
      mockInterviews: { current: 2, target: 3 },
    },
    recentActivity: [
      {
        type: "problem_solved",
        title: "Two Sum",
        time: "3:42",
        date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
      {
        type: "job_applied",
        company: "Google",
        role: "Software Engineer",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  }

  return NextResponse.json({ progress })
}

export async function PUT(request: Request) {
  const updates = await request.json()

  // Mock updating user progress
  return NextResponse.json({
    success: true,
    message: "Progress updated successfully",
  })
}
