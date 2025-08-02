import { NextResponse } from "next/server"

// Mock AI response generation - replace with actual OpenAI API call
async function generateAIResponse(message: string, currentQuestion: any, interview: any, chatHistory: any[]) {
  // Simulate AI thinking time
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const responses = {
    behavioral: [
      "That's a great example! Can you tell me more about the specific actions you took and what the measurable outcome was?",
      "I appreciate you sharing that experience. What did you learn from this situation, and how has it influenced your approach since then?",
      "Thank you for that detailed response. Could you elaborate on how you handled the stakeholder communication during this process?",
      "That sounds like a challenging situation. What would you do differently if you encountered a similar scenario in the future?",
      "Excellent use of the STAR method! Can you dive deeper into the specific metrics or results that came from your actions?",
    ],
    technical: [
      "Good explanation! Can you walk me through how you would implement this in a real-world scenario with specific code examples?",
      "That's a solid approach. What are some potential edge cases you would need to consider, and how would you handle them?",
      "I like your thinking. How would you optimize this solution for better performance, and what trade-offs would you consider?",
      "Great answer! Can you explain how this would scale if we had millions of users, and what bottlenecks might arise?",
      "Interesting perspective. What alternative approaches could you take, and when would you choose one over the other?",
    ],
    "system-design": [
      "Excellent high-level design! Can you dive deeper into the database schema and explain your choice of data storage?",
      "Good start on the architecture. How would you handle fault tolerance and what happens if one of your services goes down?",
      "I like your approach to scalability. Can you walk me through how you would handle data consistency across distributed systems?",
      "That's a thoughtful design. What monitoring and alerting would you put in place, and how would you handle performance bottlenecks?",
      "Great consideration of the requirements. How would you approach security in this system, especially for sensitive data?",
    ],
    product: [
      "That's a strategic approach! Can you explain how you would measure the success of this initiative and what KPIs you'd track?",
      "Good product thinking. How would you prioritize these features, and what framework would you use for decision-making?",
      "I appreciate that user-centric approach. Can you walk me through how you would validate these assumptions with actual users?",
      "Excellent consideration of stakeholders. How would you handle conflicting priorities between different teams or departments?",
      "That's a data-driven approach. What specific experiments would you run, and how would you interpret the results?",
    ],
  }

  const typeResponses = responses[interview.type as keyof typeof responses] || responses.behavioral
  const randomResponse = typeResponses[Math.floor(Math.random() * typeResponses.length)]

  // Add some context based on the current question
  const contextualResponse = `${randomResponse} ${currentQuestion.followUp ? `Also, ${currentQuestion.followUp}` : ""}`

  return contextualResponse
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { message, currentQuestion, chatHistory, interview } = await request.json()

    const currentQ = interview.questions[currentQuestion]

    // Generate AI response
    const response = await generateAIResponse(message, currentQ, interview, chatHistory)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error generating AI response:", error)
    return NextResponse.json({
      response:
        "Thank you for that response. Could you elaborate a bit more on your approach and the specific impact of your actions?",
    })
  }
}
