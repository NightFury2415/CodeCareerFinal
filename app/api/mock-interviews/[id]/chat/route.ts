import { type NextRequest, NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

// Global storage for interviews
global.interviews = global.interviews || new Map()

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { message, messages } = await request.json()
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

    // Create context for the AI interviewer
    const systemPrompt = `You are an experienced technical interviewer conducting a mock interview for a ${interview.jobTitle} position at ${interview.company}. The candidate has ${interview.experienceLevel} experience level.

Your role:
- Ask relevant technical and behavioral questions
- Provide constructive feedback
- Keep the conversation professional and encouraging
- Ask follow-up questions based on their responses
- Cover topics appropriate for the role and experience level

Guidelines:
- Ask one question at a time
- Wait for their response before moving to the next question
- Provide brief feedback on their answers
- Keep responses concise but informative
- Be supportive but honest in your assessment

Current conversation context: This is an ongoing interview session.`

    try {
      const { text } = await generateText({
        model: openai("gpt-4"),
        system: systemPrompt,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        maxTokens: 500,
        temperature: 0.7,
      })

      // Update interview with the new response
      interview.responses.push(message)
      global.interviews.set(interviewId, interview)

      return NextResponse.json(
        { response: text },
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    } catch (aiError) {
      console.error("OpenAI API error:", aiError)

      // Fallback responses
      const fallbackResponses = [
        "That's an interesting perspective. Can you elaborate on how you would implement that solution?",
        "Good point. What challenges do you think you might face with that approach?",
        "I see. Can you walk me through your thought process on that?",
        "That's a solid answer. Let's move on to the next question: How do you handle debugging complex issues?",
        "Thank you for that explanation. What would you say is your biggest strength as a developer?",
      ]

      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]

      return NextResponse.json(
        { response: randomResponse },
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  } catch (error) {
    console.error("Error in chat:", error)
    return NextResponse.json(
      {
        error: "Failed to process message",
        details: error.message,
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
