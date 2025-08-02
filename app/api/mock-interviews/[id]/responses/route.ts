import { NextResponse } from "next/server"

// In-memory storage for responses (in production, use a database)
const interviewResponses: { [key: string]: any[] } = {}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { questionIndex, userResponse, aiResponse } = await request.json()

    if (!interviewResponses[params.id]) {
      interviewResponses[params.id] = []
    }

    const response = {
      questionIndex,
      userResponse,
      aiResponse,
      timestamp: new Date().toISOString(),
    }

    interviewResponses[params.id].push(response)

    return NextResponse.json({ success: true, response })
  } catch (error) {
    console.error("Error saving response:", error)
    return NextResponse.json({ error: "Failed to save response" }, { status: 500 })
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const responses = interviewResponses[params.id] || []
  return NextResponse.json({ responses })
}
