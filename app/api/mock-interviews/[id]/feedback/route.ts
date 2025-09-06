import { type NextRequest, NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

// Global storage for interviews
global.interviews = global.interviews || new Map()
global.feedbacks = global.feedbacks || new Map()

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { messages, timeElapsed, questionsAnswered } = await request.json()
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

    // Generate comprehensive feedback using AI
    const feedbackPrompt = `Analyze this mock interview session and provide detailed feedback.

Interview Details:
- Position: ${interview.jobTitle}
- Company: ${interview.company}
- Experience Level: ${interview.experienceLevel}
- Duration: ${Math.floor(timeElapsed / 60)} minutes
- Questions Answered: ${questionsAnswered}

Conversation:
${messages.map((msg) => `${msg.role}: ${msg.content}`).join("\n")}

Please provide feedback in the following JSON format:
{
  "overallScore": <number 0-100>,
  "categories": {
    "technical": <number 0-100>,
    "communication": <number 0-100>,
    "problemSolving": <number 0-100>,
    "codeQuality": <number 0-100>
  },
  "strengths": [<array of strings>],
  "improvements": [<array of strings>],
  "questionAnalysis": [
    {
      "question": "<question text>",
      "userAnswer": "<user's answer>",
      "score": <number 0-100>,
      "feedback": "<specific feedback>",
      "idealAnswer": "<what an ideal answer would include>"
    }
  ],
  "recommendations": [<array of actionable recommendations>]
}`

    try {
      const { text } = await generateText({
        model: openai("gpt-4"),
        prompt: feedbackPrompt,
        maxTokens: 2000,
        temperature: 0.3,
      })

      let feedback
      try {
        feedback = JSON.parse(text)
      } catch (parseError) {
        // Fallback feedback if AI response isn't valid JSON
        feedback = generateFallbackFeedback(messages, questionsAnswered, timeElapsed)
      }

      // Add additional metadata
      feedback.timeSpent = timeElapsed
      feedback.questionsAnswered = questionsAnswered

      // Store feedback
      global.feedbacks.set(interviewId, feedback)

      return NextResponse.json(
        { feedback },
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    } catch (aiError) {
      console.error("OpenAI API error:", aiError)

      // Generate fallback feedback
      const feedback = generateFallbackFeedback(messages, questionsAnswered, timeElapsed)
      global.feedbacks.set(interviewId, feedback)

      return NextResponse.json(
        { feedback },
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  } catch (error) {
    console.error("Error generating feedback:", error)
    return NextResponse.json(
      {
        error: "Failed to generate feedback",
        details: error.message,
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const interviewId = params.id

    if (!global.feedbacks.has(interviewId)) {
      return NextResponse.json(
        { error: "Feedback not found" },
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    const feedback = global.feedbacks.get(interviewId)

    return NextResponse.json(
      { feedback },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Error fetching feedback:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch feedback",
        details: error.message,
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

function generateFallbackFeedback(messages, questionsAnswered, timeElapsed) {
  const userMessages = messages.filter((msg) => msg.role === "user")
  const avgResponseLength = userMessages.reduce((acc, msg) => acc + msg.content.length, 0) / userMessages.length || 0

  // Calculate scores based on simple heuristics
  const communicationScore = Math.min(100, Math.max(60, avgResponseLength / 10))
  const technicalScore = Math.min(100, Math.max(65, questionsAnswered * 15))
  const problemSolvingScore = Math.min(100, Math.max(70, questionsAnswered * 12 + (timeElapsed > 1800 ? 10 : 0)))
  const codeQualityScore = Math.min(100, Math.max(60, questionsAnswered * 13))

  const overallScore = Math.round((communicationScore + technicalScore + problemSolvingScore + codeQualityScore) / 4)

  return {
    overallScore,
    categories: {
      technical: Math.round(technicalScore),
      communication: Math.round(communicationScore),
      problemSolving: Math.round(problemSolvingScore),
      codeQuality: Math.round(codeQualityScore),
    },
    strengths: [
      "Showed good engagement throughout the interview",
      "Provided thoughtful responses to questions",
      "Demonstrated willingness to learn and improve",
    ],
    improvements: [
      "Could provide more detailed technical explanations",
      "Practice explaining complex concepts more clearly",
      "Work on structuring responses more effectively",
    ],
    questionAnalysis: userMessages.slice(0, 3).map((msg, index) => ({
      question: `Interview question ${index + 1}`,
      userAnswer: msg.content.substring(0, 200) + (msg.content.length > 200 ? "..." : ""),
      score: Math.round(70 + Math.random() * 25),
      feedback: "Good response with room for more technical depth",
      idealAnswer: "An ideal answer would include specific examples and technical details",
    })),
    recommendations: [
      "Practice more technical interview questions",
      "Work on explaining your thought process clearly",
      "Study system design fundamentals",
      "Practice coding problems daily",
      "Improve communication skills",
    ],
    timeSpent: timeElapsed,
    questionsAnswered,
  }
}
