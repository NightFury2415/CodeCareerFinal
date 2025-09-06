import { type NextRequest, NextResponse } from "next/server"

const interviews: any[] = []

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()
    const { questionId, answer } = body

    const interview = interviews.find((int) => int.id === id)
    if (!interview) {
      return NextResponse.json({ error: "Interview not found" }, { status: 404 })
    }

    const response = {
      questionId,
      answer,
      timestamp: new Date().toISOString(),
    }

    interview.responses.push(response)

    return NextResponse.json({
      success: true,
      response,
    })
  } catch (error) {
    console.error("Failed to save response:", error)
    return NextResponse.json({ error: "Failed to save response" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const interview = interviews.find((int) => int.id === id)

    if (!interview) {
      return NextResponse.json({ error: "Interview not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      responses: interview.responses,
    })
  } catch (error) {
    console.error("Failed to fetch responses:", error)
    return NextResponse.json({ error: "Failed to fetch responses" }, { status: 500 })
  }
}
