import { NextResponse } from "next/server"

// Mock data storage - in production, use a database
const interviews: { [key: string]: any } = {}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const interview = interviews[params.id]

  if (!interview) {
    // Return a mock interview for demo purposes
    const mockInterview = {
      id: params.id,
      userId: "user123",
      type: "behavioral",
      role: "Software Engineer",
      company: "Google",
      experience: "mid",
      questions: [
        {
          question:
            "Tell me about a challenging software engineering project you worked on. How did you overcome the obstacles?",
          type: "behavioral",
          difficulty: "medium",
          tips: ["Use the STAR method", "Focus on your specific actions", "Highlight measurable outcomes"],
          followUp: "What would you do differently if you faced a similar situation again?",
          expectedDuration: 300,
        },
        {
          question: "Describe a time when you had to work with a difficult team member. How did you handle it?",
          type: "behavioral",
          difficulty: "medium",
          tips: ["Show empathy and understanding", "Focus on resolution", "Demonstrate leadership"],
          followUp: "How did this experience change your approach to team collaboration?",
          expectedDuration: 300,
        },
        {
          question:
            "Give me an example of when you had to learn a new technology quickly for a software engineering role.",
          type: "behavioral",
          difficulty: "medium",
          tips: ["Show learning approach", "Mention resources used", "Discuss practical application"],
          followUp: "How do you typically approach learning new technologies?",
          expectedDuration: 300,
        },
        {
          question: "Tell me about a time when you disagreed with your manager or team lead. How did you handle it?",
          type: "behavioral",
          difficulty: "hard",
          tips: [
            "Show respect and professionalism",
            "Focus on the issue, not the person",
            "Demonstrate problem-solving",
          ],
          followUp: "What did you learn from this experience?",
          expectedDuration: 300,
        },
        {
          question: "Describe a situation where you had to make a difficult technical decision. What was your process?",
          type: "behavioral",
          difficulty: "hard",
          tips: ["Explain your decision-making framework", "Show consideration of stakeholders", "Discuss the outcome"],
          followUp: "How do you typically approach difficult technical decisions?",
          expectedDuration: 300,
        },
      ],
      status: "created",
      createdAt: new Date().toISOString(),
      responses: [],
      currentQuestion: 0,
      startedAt: null,
      completedAt: null,
    }

    interviews[params.id] = mockInterview
    return NextResponse.json({ interview: mockInterview })
  }

  return NextResponse.json({ interview })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updates = await request.json()

    if (interviews[params.id]) {
      interviews[params.id] = { ...interviews[params.id], ...updates }
      return NextResponse.json({ interview: interviews[params.id] })
    }

    // Create if doesn't exist
    interviews[params.id] = updates
    return NextResponse.json({ interview: interviews[params.id] })
  } catch (error) {
    console.error("Error updating interview:", error)
    return NextResponse.json({ error: "Failed to update interview" }, { status: 500 })
  }
}
