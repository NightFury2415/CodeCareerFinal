import { NextResponse } from "next/server"

// Mock AI feedback generation - replace with actual OpenAI API call
async function generateFeedback(interview: any, responses: any[]) {
  // Simulate AI processing time
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Generate mock feedback based on interview type and responses
  const mockFeedback = {
    overallScore: Math.floor(Math.random() * 20) + 80, // 80-100
    scores: {
      communication: Math.floor(Math.random() * 15) + 85,
      technical: Math.floor(Math.random() * 20) + 75,
      problemSolving: Math.floor(Math.random() * 15) + 85,
      leadership: Math.floor(Math.random() * 20) + 80,
    },
    questionScores: interview.questions.map(() => Math.floor(Math.random() * 20) + 80),
    questionFeedback: interview.questions.map((q: any, index: number) => {
      const feedbackOptions = [
        "Excellent response with clear structure and specific examples. Your use of the STAR method was particularly effective.",
        "Good answer that demonstrates relevant experience. Consider adding more quantifiable results to strengthen your response.",
        "Solid response showing good problem-solving skills. Could benefit from more detail about the specific actions you took.",
        "Strong example that shows leadership qualities. The outcome was well-articulated and measurable.",
        "Good technical explanation. Consider discussing alternative approaches and trade-offs in future responses.",
      ]
      return feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)]
    }),
    strengths: [
      "Clear communication and structured responses",
      "Good use of specific examples from real experience",
      "Demonstrated strong problem-solving abilities",
      "Showed leadership and initiative in challenging situations",
      "Articulated outcomes and impact effectively",
    ],
    improvements: [
      "Could provide more quantifiable results and metrics",
      "Consider discussing lessons learned and future applications",
      "Expand on technical implementation details when relevant",
      "Include more stakeholder perspective in your examples",
      "Practice concise storytelling while maintaining detail",
    ],
    nextSteps: [
      `Practice more ${interview.type} questions for your experience level`,
      "Prepare specific metrics and outcomes for your examples",
      "Work on concise storytelling for behavioral questions",
      "Review common technical concepts for your role",
      "Practice explaining complex topics in simple terms",
    ],
    duration: "42m",
    summary: `Overall strong performance in this ${interview.type} interview. Your responses showed good structure and relevant experience. Focus on adding more quantifiable results and specific metrics to strengthen future interviews.`,
  }

  return mockFeedback
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    // Fetch interview data
    const interviewResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/mock-interviews/${params.id}`,
    )
    const { interview } = await interviewResponse.json()

    // Fetch responses
    const responsesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/mock-interviews/${params.id}/responses`,
    )
    const { responses } = await responsesResponse.json()

    // Generate comprehensive feedback
    const feedback = await generateFeedback(interview, responses)

    return NextResponse.json({ feedback })
  } catch (error) {
    console.error("Error generating feedback:", error)

    // Return fallback feedback
    const fallbackFeedback = {
      overallScore: 85,
      scores: {
        communication: 88,
        technical: 82,
        problemSolving: 90,
        leadership: 85,
      },
      questionScores: [85, 90, 80, 88, 87],
      questionFeedback: [
        "Good response with clear structure. Consider adding more specific examples.",
        "Excellent use of the STAR method. Strong outcome articulation.",
        "Solid technical explanation. Could benefit from discussing trade-offs.",
        "Great leadership example. Well-structured and impactful.",
        "Good problem-solving approach. Consider mentioning lessons learned.",
      ],
      strengths: [
        "Clear communication and structured responses",
        "Good use of specific examples",
        "Demonstrated problem-solving abilities",
      ],
      improvements: [
        "Could provide more quantifiable results",
        "Consider discussing lessons learned",
        "Expand on technical details when relevant",
      ],
      nextSteps: [
        "Practice more questions for your experience level",
        "Prepare specific metrics for examples",
        "Work on concise storytelling",
      ],
      duration: "42m",
      summary: "Overall strong performance with good communication skills and relevant examples.",
    }

    return NextResponse.json({ feedback: fallbackFeedback })
  }
}
