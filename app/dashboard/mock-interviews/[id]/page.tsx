"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Brain, Send, Mic, MicOff, Clock, User, Bot, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface InterviewData {
  id: string
  jobTitle: string
  experienceLevel: string
  company: string
  duration: number
  status: string
  questions: string[]
  responses: string[]
  currentQuestionIndex: number
}

export default function MockInterviewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [interview, setInterview] = useState<InterviewData | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [questionsAnswered, setQuestionsAnswered] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    loadInterview()
    startTimer()
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [params.id])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const loadInterview = async () => {
    try {
      const response = await fetch(`/api/mock-interviews/${params.id}`)
      if (!response.ok) {
        throw new Error("Failed to load interview")
      }

      const data = await response.json()
      setInterview(data.interview)

      // Add welcome message
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content: `Hello! I'm your AI interviewer for the ${data.interview.jobTitle} position at ${data.interview.company}. I'll be conducting a ${data.interview.duration}-minute interview session. Let's start with a brief introduction - tell me about yourself and your background.`,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    } catch (error) {
      console.error("Error loading interview:", error)
      router.push("/dashboard/mock-interviews")
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isSending) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsSending(true)

    try {
      const response = await fetch(`/api/mock-interviews/${params.id}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          messages: messages,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setQuestionsAnswered((prev) => prev + 1)
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const endInterview = async () => {
    try {
      const response = await fetch(`/api/mock-interviews/${params.id}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
          timeElapsed,
          questionsAnswered,
        }),
      })

      if (response.ok) {
        router.push(`/dashboard/mock-interviews/${params.id}/results`)
      }
    } catch (error) {
      console.error("Error ending interview:", error)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen bg-slate-900">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-white">Loading interview...</p>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    )
  }

  if (!interview) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen bg-slate-900">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-white mb-4">Interview not found</p>
                <Link href="/dashboard/mock-interviews">
                  <Button>Back to Mock Interviews</Button>
                </Link>
              </div>
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
            <div className="flex items-center gap-2 px-4">
              <Link href="/dashboard/mock-interviews">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                <h1 className="text-xl font-semibold text-white">Mock Interview</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 flex flex-col">
            {/* Interview Info Bar */}
            <div className="bg-slate-800/50 border-b border-slate-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div>
                    <h2 className="text-white font-semibold">{interview.jobTitle}</h2>
                    <p className="text-gray-400 text-sm">{interview.company}</p>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-300">{interview.experienceLevel}</Badge>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span className="font-mono">{formatTime(timeElapsed)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <CheckCircle className="w-4 h-4" />
                    <span>{questionsAnswered} questions answered</span>
                  </div>
                  <Button
                    onClick={endInterview}
                    variant="outline"
                    className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    End Interview
                  </Button>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-3xl p-4 rounded-lg ${
                      message.role === "user" ? "bg-purple-500 text-white" : "bg-slate-700 text-gray-100"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {message.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="flex justify-start">
                  <div className="max-w-3xl p-4 rounded-lg bg-slate-700 text-gray-100">
                    <div className="flex items-center space-x-3">
                      <Bot className="w-5 h-5" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-700 p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your response..."
                    className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 pr-12"
                    disabled={isSending}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isSending}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-purple-500 hover:bg-purple-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsRecording(!isRecording)}
                  className={`border-slate-600 ${
                    isRecording ? "bg-red-500/20 text-red-400 border-red-500" : "text-gray-300 hover:bg-slate-700"
                  }`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
