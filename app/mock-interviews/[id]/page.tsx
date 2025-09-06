"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Clock, Send, Bot, User, CheckCircle, ArrowRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  type: "ai" | "user"
  content: string
  timestamp: string
  questionNumber?: number
}

export default function MockInterviewSessionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [interview, setInterview] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSessionStarted, setIsSessionStarted] = useState(false)
  const [isSessionComplete, setIsSessionComplete] = useState(false)
  const [isAiTyping, setIsAiTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchInterview()
  }, [params.id])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const fetchInterview = async () => {
    try {
      // Mock fetch - in real app, this would fetch from your API
      const mockInterview = {
        id: params.id,
        jobTitle: "Software Engineer",
        jobLevel: "mid",
        company: "Google",
        interviewType: "behavioral",
        focusAreas: "leadership, problem-solving",
        questions: [
          "Tell me about a time when you had to work under pressure to meet a tight deadline.",
          "Describe a situation where you had to resolve a conflict with a team member.",
          "Give me an example of when you had to learn something new quickly.",
          "Tell me about a project you're particularly proud of and why.",
          "Describe a time when you had to give difficult feedback to someone.",
          "Tell me about a mistake you made and how you handled it.",
          "Describe a situation where you had to influence someone without authority.",
          "Give me an example of when you went above and beyond your job requirements.",
          "Tell me about a time when you had to adapt to a significant change.",
          "Describe a situation where you had to work with a difficult stakeholder.",
        ],
        status: "created",
      }
      setInterview(mockInterview)
    } catch (error) {
      console.error("Failed to fetch interview:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const startInterview = () => {
    setIsSessionStarted(true)
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      type: "ai",
      content: `Hello! I'm your AI interviewer for today's ${interview.interviewType} interview for the ${interview.jobTitle} position${interview.company !== "General" ? ` at ${interview.company}` : ""}. 

I'll be asking you 10 questions, and we'll have a natural conversation about each one. Feel free to take your time with your responses, and don't hesitate to ask for clarification if needed.

Let's begin with our first question:

**Question 1:** ${interview.questions[0]}`,
      timestamp: new Date().toISOString(),
      questionNumber: 1,
    }
    setMessages([welcomeMessage])
  }

  const sendMessage = async () => {
    if (!currentInput.trim() || isAiTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: currentInput,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setCurrentInput("")
    setIsAiTyping(true)

    // Simulate AI processing time
    setTimeout(async () => {
      const aiResponse = await generateAIResponse(currentInput, currentQuestion)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date().toISOString(),
        questionNumber: currentQuestion < 9 ? currentQuestion + 2 : undefined,
      }

      setMessages((prev) => [...prev, aiMessage])

      if (currentQuestion < 9) {
        setCurrentQuestion((prev) => prev + 1)
      } else {
        // Interview complete
        setTimeout(() => {
          completeInterview()
        }, 2000)
      }

      setIsAiTyping(false)
    }, 2000)
  }

  const generateAIResponse = async (userResponse: string, questionIndex: number) => {
    // Mock AI responses with follow-up questions
    const followUpResponses = [
      "That's a great example! I can see you handled the pressure well. Can you tell me more about what specific strategies you used to prioritize your tasks?",
      "Interesting approach to conflict resolution. How did you ensure both parties felt heard during this process?",
      "That shows great adaptability! What was the most challenging part of learning that new skill so quickly?",
      "I love hearing about projects people are passionate about. What impact did this project have on your team or organization?",
      "Giving feedback can be tough. How did you prepare for that conversation, and what was the outcome?",
      "Thank you for being so honest about that mistake. What systems or processes did you put in place to prevent similar issues?",
      "That's a valuable skill - influencing without authority. What techniques did you find most effective in that situation?",
      "Going above and beyond shows great initiative. How did your manager and team react to your extra efforts?",
      "Change can be challenging for everyone. How did you help others on your team adapt to this change as well?",
      "Working with difficult stakeholders is a common challenge. What did you learn from this experience that you've applied since?",
    ]

    if (questionIndex < 9) {
      return `${followUpResponses[questionIndex]}

Let's move on to our next question:

**Question ${questionIndex + 2}:** ${interview.questions[questionIndex + 1]}`
    } else {
      return `Thank you for that final response. You've completed all 10 questions! 

I'm now analyzing your responses to provide you with detailed feedback on your performance. This includes:

• Overall interview score and breakdown
• Strengths you demonstrated
• Areas for improvement  
• Specific suggestions for better answers
• Comparison to typical responses for your experience level

You'll be redirected to your detailed feedback report in just a moment. Great job completing the interview!`
    }
  }

  const completeInterview = () => {
    setIsSessionComplete(true)
    setTimeout(() => {
      router.push(`/mock-interviews/${params.id}/results`)
    }, 3000)
  }

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen bg-gray-950">
          <AppSidebar />
          <SidebarInset className="flex-1 flex items-center justify-center">
            <div className="text-white">Loading interview...</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    )
  }

  if (!interview) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen bg-gray-950">
          <AppSidebar />
          <SidebarInset className="flex-1 flex items-center justify-center">
            <div className="text-white">Interview not found</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-950">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800 px-4">
            <SidebarTrigger className="text-white" />
            <div className="flex items-center gap-2 px-4">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              <h1 className="text-xl font-semibold text-white">Mock Interview Session</h1>
            </div>
            {isSessionStarted && (
              <div className="ml-auto flex items-center gap-4">
                <Badge className="bg-purple-500/20 text-purple-400">Question {currentQuestion + 1} of 10</Badge>
                <div className="flex items-center gap-2 text-white">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">In Progress</span>
                </div>
              </div>
            )}
          </header>

          <div className="flex-1 p-6">
            {!isSessionStarted ? (
              /* Pre-Interview Setup */
              <div className="max-w-2xl mx-auto">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-2xl mb-2">Ready to Start?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      <h3 className="text-white font-semibold mb-3">Interview Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Position:</span>
                          <span className="text-white">{interview.jobTitle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Level:</span>
                          <span className="text-white">{interview.jobLevel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Company:</span>
                          <span className="text-white">{interview.company}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Type:</span>
                          <span className="text-white">{interview.interviewType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Focus Areas:</span>
                          <span className="text-white">{interview.focusAreas || "General"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
                      <h4 className="text-blue-400 font-semibold mb-2">Interview Format</h4>
                      <ul className="text-blue-300 text-sm space-y-1">
                        <li>• 10 personalized questions</li>
                        <li>• Natural conversation flow</li>
                        <li>• AI follow-up questions</li>
                        <li>• Detailed performance feedback</li>
                        <li>• Estimated time: 30-45 minutes</li>
                      </ul>
                    </div>

                    <Button
                      onClick={startInterview}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg py-6"
                    >
                      Start Interview
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Interview Chat Interface */
              <div className="max-w-4xl mx-auto h-full flex flex-col">
                <div className="mb-4">
                  <Progress value={((currentQuestion + 1) / 10) * 100} className="h-2" />
                </div>

                <Card className="flex-1 bg-gray-900/50 border-gray-800 flex flex-col">
                  <CardContent className="flex-1 p-6 flex flex-col">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-96">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-4 rounded-lg ${
                              message.type === "user"
                                ? "bg-purple-600 text-white"
                                : "bg-gray-800 text-gray-100 border border-gray-700"
                            }`}
                          >
                            <div className="flex items-start space-x-2 mb-2">
                              {message.type === "ai" ? (
                                <Bot className="w-5 h-5 text-purple-400 mt-0.5" />
                              ) : (
                                <User className="w-5 h-5 text-white mt-0.5" />
                              )}
                              <span className="font-medium text-sm">
                                {message.type === "ai" ? "AI Interviewer" : "You"}
                              </span>
                            </div>
                            <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                            <div className="text-xs opacity-70 mt-2">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))}

                      {isAiTyping && (
                        <div className="flex justify-start">
                          <div className="bg-gray-800 text-gray-100 border border-gray-700 p-4 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Bot className="w-5 h-5 text-purple-400" />
                              <span className="font-medium text-sm">AI Interviewer</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                              <div className="animate-pulse flex space-x-1">
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-400">AI is analyzing your response...</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    {!isSessionComplete && (
                      <div className="flex space-x-2">
                        <Textarea
                          value={currentInput}
                          onChange={(e) => setCurrentInput(e.target.value)}
                          placeholder="Type your response here..."
                          className="flex-1 bg-gray-800 border-gray-700 text-white resize-none min-h-[80px]"
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              sendMessage()
                            }
                          }}
                          disabled={isAiTyping}
                        />
                        <Button
                          onClick={sendMessage}
                          disabled={!currentInput.trim() || isAiTyping}
                          className="bg-purple-600 hover:bg-purple-700 self-end"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    {isSessionComplete && (
                      <div className="text-center p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                        <h3 className="text-white font-semibold text-lg mb-2">Interview Complete!</h3>
                        <p className="text-gray-400 mb-4">Generating your detailed feedback report...</p>
                        <div className="flex items-center justify-center space-x-2 text-purple-400">
                          <span>Redirecting to results</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
