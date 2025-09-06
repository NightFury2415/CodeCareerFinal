import { type NextRequest, NextResponse } from "next/server"

// Global storage for interviews (in production, use a database)
global.interviews = global.interviews || new Map()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const interviewId = params.id

    if (!global.interviews.has(interviewId)) {
      return NextResponse.json(
        { error: "Interview not found" },
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    const interview = global.interviews.get(interviewId)

    return NextResponse.json(
      { interview },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Error fetching interview:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch interview",
        details: error.message,
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
