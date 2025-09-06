import { type NextRequest, NextResponse } from "next/server"

// Global storage for interviews (in production, use a database)
global.interviews = global.interviews || new Map()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { jobTitle, experienceLevel, company, duration } = body

    if (!jobTitle || !experienceLevel || !company || !duration) {
      return NextResponse.json(
        { error: "Missing required fields" },
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Generate a unique interview ID
    const interviewId = `interview_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create interview data
    const interviewData = {
      id: interviewId,
      jobTitle,
      experienceLevel,
      company,
      duration: Number.parseInt(duration),
      status: "setup",
      createdAt: new Date().toISOString(),
      questions: [],
      responses: [],
      currentQuestionIndex: 0,
    }

    // Store in global storage
    global.interviews.set(interviewId, interviewData)

    return NextResponse.json(
      {
        success: true,
        interviewId,
        message: "Interview created successfully",
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Error creating interview:", error)
    return NextResponse.json(
      {
        error: "Failed to create interview",
        details: error.message,
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
