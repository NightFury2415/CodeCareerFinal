import { NextResponse } from "next/server"

// Mock OpenAI integration - replace with actual OpenAI API call
async function generateInterviewQuestions(type: string, role: string, experience: string, company: string) {
  // Simulate AI-generated questions based on parameters
  const questionTemplates = {
    behavioral: [
      {
        question: `Tell me about a challenging ${role.toLowerCase()} project you worked on. How did you overcome the obstacles?`,
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
        question: `Give me an example of when you had to learn a new technology or skill quickly for a ${role.toLowerCase()} role.`,
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
        tips: ["Show respect and professionalism", "Focus on the issue, not the person", "Demonstrate problem-solving"],
        followUp: "What did you learn from this experience?",
        expectedDuration: 300,
      },
      {
        question: `Describe a situation where you had to make a difficult decision as a ${role.toLowerCase()}. What was your process?`,
        type: "behavioral",
        difficulty: "hard",
        tips: ["Explain your decision-making framework", "Show consideration of stakeholders", "Discuss the outcome"],
        followUp: "How do you typically approach difficult decisions?",
        expectedDuration: 300,
      },
    ],
    technical: [
      {
        question: "Explain the difference between synchronous and asynchronous programming. When would you use each?",
        type: "technical",
        difficulty: "medium",
        tips: ["Provide clear definitions", "Give practical examples", "Discuss trade-offs"],
        followUp: "How would you handle errors in asynchronous operations?",
        expectedDuration: 300,
      },
      {
        question: "Design a simple caching system. What data structures would you use and why?",
        type: "technical",
        difficulty: "medium",
        tips: ["Consider different cache policies", "Think about performance", "Discuss scalability"],
        followUp: "How would you handle cache invalidation?",
        expectedDuration: 300,
      },
      {
        question: "What is the time complexity of common sorting algorithms? When would you use each?",
        type: "technical",
        difficulty: "medium",
        tips: ["Know Big O notation", "Consider space complexity too", "Think about real-world scenarios"],
        followUp: "How would you optimize sorting for a specific use case?",
        expectedDuration: 300,
      },
      {
        question: "Explain how you would implement a rate limiter for an API.",
        type: "technical",
        difficulty: "hard",
        tips: ["Consider different algorithms", "Think about distributed systems", "Discuss trade-offs"],
        followUp: "How would you handle rate limiting in a microservices architecture?",
        expectedDuration: 300,
      },
    ],
    "system-design": [
      {
        question: "Design a URL shortening service like bit.ly. Walk me through your approach.",
        type: "system-design",
        difficulty: "hard",
        tips: ["Start with requirements", "Consider scale", "Think about data storage"],
        followUp: "How would you handle analytics and click tracking?",
        expectedDuration: 600,
      },
      {
        question: "How would you design a chat application that supports millions of users?",
        type: "system-design",
        difficulty: "hard",
        tips: ["Consider real-time requirements", "Think about message storage", "Plan for scalability"],
        followUp: "How would you implement message encryption?",
        expectedDuration: 600,
      },
      {
        question: "Design a notification system that can send push notifications, emails, and SMS.",
        type: "system-design",
        difficulty: "hard",
        tips: ["Consider different channels", "Think about reliability", "Plan for scale"],
        followUp: "How would you handle notification preferences and opt-outs?",
        expectedDuration: 600,
      },
    ],
    product: [
      {
        question: `How would you prioritize features for a ${role.toLowerCase()} tool used by developers?`,
        type: "product",
        difficulty: "medium",
        tips: ["Consider user needs", "Think about business impact", "Use frameworks like RICE"],
        followUp: "How would you measure the success of these features?",
        expectedDuration: 300,
      },
      {
        question: "Walk me through how you would launch a new product feature.",
        type: "product",
        difficulty: "medium",
        tips: ["Consider the full lifecycle", "Think about stakeholders", "Plan for measurement"],
        followUp: "How would you handle negative user feedback post-launch?",
        expectedDuration: 300,
      },
      {
        question: "How would you improve user engagement for a mobile app that's seeing declining usage?",
        type: "product",
        difficulty: "hard",
        tips: ["Analyze the data first", "Consider user journey", "Think about retention strategies"],
        followUp: "What metrics would you track to measure improvement?",
        expectedDuration: 300,
      },
    ],
  }

  const templates = questionTemplates[type as keyof typeof questionTemplates] || questionTemplates.behavioral
  const questionCount = type === "system-design" ? 3 : type === "technical" ? 5 : 6

  // Select questions based on experience level
  let selectedQuestions = templates.slice(0, questionCount)

  if (experience === "entry") {
    selectedQuestions = selectedQuestions.filter((q) => q.difficulty !== "hard")
  } else if (experience === "senior" || experience === "lead") {
    selectedQuestions = selectedQuestions.map((q) => ({ ...q, difficulty: "hard" }))
  }

  // Customize questions for specific companies
  if (company && company !== "General") {
    selectedQuestions = selectedQuestions.map((q) => ({
      ...q,
      question: q.question.includes("company")
        ? q.question
        : `${q.question} Consider this in the context of ${company}'s engineering culture.`,
    }))
  }

  return selectedQuestions
}

const interviews: any[] = []

export async function POST(request: Request) {
  try {
    const { type, role, company, experience, userId } = await request.json()

    // Generate interview questions
    const questions = await generateInterviewQuestions(type, role, experience, company)

    const interview = {
      id: Date.now().toString(),
      userId,
      type,
      role,
      company: company || "General",
      experience,
      questions,
      status: "created",
      createdAt: new Date().toISOString(),
      responses: [],
      currentQuestion: 0,
      startedAt: null,
      completedAt: null,
    }

    interviews.push(interview)

    return NextResponse.json({ interview })
  } catch (error) {
    console.error("Error creating interview:", error)
    return NextResponse.json({ error: "Failed to create interview" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  let filteredInterviews = interviews
  if (userId) {
    filteredInterviews = interviews.filter((interview) => interview.userId === userId)
  }

  return NextResponse.json({ interviews: filteredInterviews })
}
