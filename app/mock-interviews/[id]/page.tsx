"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Clock, Brain, Send, Mic, MicOff } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function MockInterviewSessionPage({ params }: { params: { id: string } }) {
  const [interview, setInterview] = useState<any>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes
  const [sessionStarted, setSessionStarted] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [userResponse, setUserResponse] = useState("")
  const [isAiThinking, setIsAiThinking] = useState(false)
  const [chatHistory, setChatHistory] = useState<any[]>([])
  const [sessionComplete, setSessionComplete] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchInterview()
  }, [params.id])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (sessionStarted && timeRemaining > 0 && !sessionComplete) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            // Auto-advance to next question when time runs out
            handleNextQuestion()
            return 300
          }
          return time - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [sessionStarted, timeRemaining, sessionComplete])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatHistory])

  const fetchInterview = async () => {
    try {
      const response = await fetch(`/api/mock-interviews/${params.id}`)
      const data = await response.json()
      setInterview(data.interview)
    } catch (error) {
      console.error("Failed to fetch interview:", error)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const startSession = async () => {
    setSessionStarted(true)
    setIsRecording(true)

    // Update interview status
    await fetch(`/api/mock-interviews/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "in_progress", startedAt: new Date().toISOString() }),
    })

    // Add initial AI greeting
    const greeting = `Hello! I'm your AI interviewer for today's ${interview?.type} interview. I'll be asking you questions for the ${interview?.role} position${interview?.company && interview.company !== "General" ? ` at ${interview?.company}` : ""}. 

We have ${interview?.questions?.length} questions to cover, and you'll have about 5 minutes per question. Feel free to take your time to think through your answers.

Let's start with our first question: ${interview?.questions[0]?.question}`

    setChatHistory([
      {
        type: "ai",
        message: greeting,
        timestamp: new Date().toISOString(),
        questionIndex: 0,
      },
    ])
  }

  const sendResponse = async () => {
    if (!userResponse.trim()) return

    const newUserMessage = {
      type: "user",
      message: userResponse,
      timestamp: new Date().toISOString(),
      questionIndex: currentQuestion,
    }

    setChatHistory((prev) => [...prev, newUserMessage])
    setIsAiThinking(true)

    try {
      const response = await fetch(`/api/mock-interviews/${params.id}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userResponse,
          currentQuestion,
          chatHistory: [...chatHistory, newUserMessage],
          interview,
        }),
      })

      const data = await response.json()

      const aiMessage = {
        type: "ai",
        message: data.response,
        timestamp: new Date().toISOString(),
        questionIndex: currentQuestion,
      }

      setChatHistory((prev) => [...prev, aiMessage])
      setUserResponse("")

      // Save the response
      await fetch(`/api/mock-interviews/${params.id}/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionIndex: currentQuestion,
          userResponse: userResponse,
          aiResponse: data.response,
        }),
      })
    } catch (error) {
      console.error("Failed to send message:", error)
      const errorMessage = {
        type: "ai",
        message: "I apologize, but I'm having trouble processing your response. Could you please try again?",
        timestamp: new Date().toISOString(),
        questionIndex: currentQuestion,
      }
      setChatHistory((prev) => [...prev, errorMessage])
    } finally {
      setIsAiThinking(false)
    }
  }

  const handleNextQuestion = async () => {
    if (currentQuestion < interview.questions.length - 1) {
      const nextIndex = currentQuestion + 1
      setCurrentQuestion(nextIndex)
      setTimeRemaining(300) // Reset timer for next question

      const nextQ = interview.questions[nextIndex]
      const aiMessage = {
        type: "ai",
        message: `Thank you for that response. Let's move on to our next question: ${nextQ.question}`,
        timestamp: new Date().toISOString(),
        questionIndex: nextIndex,
      }
      setChatHistory((prev) => [...prev, aiMessage])
    } else {
      // Interview complete
      await completeInterview()
    }
  }

  const completeInterview = async () => {
    setSessionComplete(true)
    setIsRecording(false)

    // Update interview status
    await fetch(`/api/mock-interviews/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "completed",
        completedAt: new Date().toISOString(),
        chatHistory,
      }),
    })

    const completionMessage = {
      type: "ai",
      message:
        "Excellent! We've completed all the questions. I'm now analyzing your responses to provide detailed feedback. You'll be redirected to your results page shortly.",
      timestamp: new Date().toISOString(),
      questionIndex: currentQuestion,
    }
    setChatHistory((prev) => [...prev, completionMessage])

    // Redirect to results after a short delay
    setTimeout(() => {
      window.location.href = `/mock-interviews/${params.id}/results`
    }, 3000)
  }

  if (!interview) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen bg-slate-900">
          <AppSidebar />
          <SidebarInset className="flex-1 flex items-center justify-center">
            <div className="text-white">Loading interview...</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    )
  }

  if (!sessionStarted) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen bg-slate-900">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4">
              <SidebarTrigger className="text-white" />
              <div className="flex items-center gap-2 px-4">
                <h1 className="text-xl font-semibold text-white">Mock Interview Session</h1>
              </div>
            </header>

            <div className="flex-1 flex items-center justify-center p-6">
              <Card className="bg-slate-800/50 border-slate-700 max-w-2xl w-full">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-2xl">Ready to Start Your Interview?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center text-gray-400">
                    <p className="mb-2">
                      <strong className="text-white">
                        {interview.type.charAt(0).toUpperCase() + interview.type.slice(1)}
                      </strong>{" "}
                      interview for <strong className="text-white">{interview.role}</strong>
                      {interview.company && interview.company !== "General" && (
                        <>
                          {" "}
                          at <strong className="text-white">{interview.company}</strong>
                        </>
                      )}
                    </p>
                    <p>
                      Experience Level: <strong className="text-white">{interview.experience}</strong>
                    </p>
                    <p className="mt-2">You'll have 5 minutes per question to provide your answer.</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-white">{interview.questions.length}</div>
                      <div className="text-sm text-gray-400">Questions</div>
                    </div>
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-white">{interview.questions.length * 5}</div>
                      <div className="text-sm text-gray-400">Minutes</div>
                    </div>
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-white">AI</div>
                      <div className="text-sm text-gray-400">Powered</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-white font-semibold">Interview Tips:</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li>• Make sure you're in a quiet environment</li>
                      <li>• Use the STAR method for behavioral questions</li>
                      <li>• Take your time to think before answering</li>
                      <li>• Be specific with examples and outcomes</li>
                      <li>• Ask clarifying questions if needed</li>
                    </ul>
                  </div>

                  <Button
                    onClick={startSession}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg py-6"
                  >
                    Start Interview
                  </Button>
                </CardContent>
              </Card>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4">
            <SidebarTrigger className="text-white" />
            <div className="flex items-center justify-between w-full px-4">
              <h1 className="text-xl font-semibold text-white">Interview in Progress</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-white">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
                </div>
                <Badge className="bg-red-500/20 text-red-400">
                  Question {currentQuestion + 1} of {interview.questions.length}
                </Badge>
              </div>
            </div>
          </header>

          <div className="flex-1 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <Card className="bg-slate-800/50 border-slate-700 h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      AI Interview Chat
                      {isRecording && (
                        <div className="ml-auto flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-red-400">Recording</span>
                        </div>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-6">
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-96">
                      {chatHistory.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.type === "user" ? "bg-purple-600 text-white" : "bg-slate-700 text-gray-100"
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{message.message}</p>
                            <div className="text-xs opacity-70 mt-1">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))}
                      {isAiThinking && (
                        <div className="flex justify-start">
                          <div className="bg-slate-700 text-gray-100 p-3 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <div className="animate-spin w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full"></div>
                              <span>AI is analyzing your response...</span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Input Area */}
                    {!sessionComplete && (
                      <div className="flex space-x-2">
                        <Textarea
                          value={userResponse}
                          onChange={(e) => setUserResponse(e.target.value)}
                          placeholder="Type your response here..."
                          className="flex-1 bg-slate-700 border-slate-600 text-white resize-none"
                          rows={3}
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              sendResponse()
                            }
                          }}
                        />
                        <div className="flex flex-col space-y-2">
                          <Button
                            onClick={sendResponse}
                            disabled={!userResponse.trim() || isAiThinking}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setIsRecording(!isRecording)}
                            className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                          >
                            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Question Panel */}
              <div className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Current Question</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <Badge className="mb-3 bg-purple-500/20 text-purple-400">
                        {interview.questions[currentQuestion].type}
                      </Badge>
                      <p className="text-white leading-relaxed">{interview.questions[currentQuestion].question}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">Tips:</h4>
                      <ul className="space-y-1">
                        {interview.questions[currentQuestion].tips.map((tip: string, index: number) => (
                          <li key={index} className="text-sm text-gray-400">
                            • {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Progress value={(timeRemaining / 300) * 100} className="h-2" />
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Session Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {interview.questions.map((_: any, index: number) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              index < currentQuestion
                                ? "bg-green-500"
                                : index === currentQuestion
                                  ? "bg-purple-500"
                                  : "bg-gray-600"
                            }`}
                          ></div>
                          <span
                            className={`text-sm ${
                              index === currentQuestion ? "text-white font-medium" : "text-gray-400"
                            }`}
                          >
                            Question {index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {!sessionComplete && (
                  <div className="space-y-3">
                    {currentQuestion < interview.questions.length - 1 ? (
                      <Button
                        onClick={handleNextQuestion}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        Next Question
                      </Button>
                    ) : (
                      <Button
                        onClick={completeInterview}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        Finish Interview
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={completeInterview}
                      className="w-full border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                    >
                      End Session
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
