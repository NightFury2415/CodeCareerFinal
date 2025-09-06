"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  ArrowLeft,
  Trophy,
  Target,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Star,
} from "lucide-react"
import Link from "next/link"

interface FeedbackData {
  overallScore: number
  categories: {
    technical: number
    communication: number
    problemSolving: number
    codeQuality: number
  }
  strengths: string[]
  improvements: string[]
  questionAnalysis: Array<{
    question: string
    userAnswer: string
    score: number
    feedback: string
    idealAnswer: string
  }>
  recommendations: string[]
  timeSpent: number
  questionsAnswered: number
}

export default function InterviewResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [feedback, setFeedback] = useState<FeedbackData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadResults()
  }, [params.id])

  const loadResults = async () => {
    try {
      const response = await fetch(`/api/mock-interviews/${params.id}/feedback`)
      if (!response.ok) {
        throw new Error("Failed to load results")
      }

      const data = await response.json()
      setFeedback(data.feedback)
    } catch (error) {
      console.error("Error loading results:", error)
      router.push("/dashboard/mock-interviews")
    } finally {
      setIsLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400"
    if (score >= 80) return "text-blue-400"
    if (score >= 70) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-500/20"
    if (score >= 80) return "bg-blue-500/20"
    if (score >= 70) return "bg-yellow-500/20"
    return "bg-red-500/20"
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
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
                <p className="text-white">Analyzing your performance...</p>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    )
  }

  if (!feedback) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen bg-slate-900">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-white mb-4">Results not found</p>
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
                  Back to Interviews
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <h1 className="text-xl font-semibold text-white">Interview Results</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-6 max-w-6xl mx-auto">
            {/* Overall Score */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl mb-2">Interview Complete!</CardTitle>
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${getScoreColor(feedback.overallScore)} mb-2`}>
                      {feedback.overallScore}%
                    </div>
                    <p className="text-gray-300">Overall Score</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">{formatTime(feedback.timeSpent)}</div>
                    <p className="text-gray-300">Time Spent</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">{feedback.questionsAnswered}</div>
                    <p className="text-gray-300">Questions</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Category Breakdown */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  Performance Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(feedback.categories).map(([category, score]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white capitalize font-medium">
                          {category.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span className={`font-bold ${getScoreColor(score)}`}>{score}%</span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Strengths */}
              <Card className="bg-green-900/20 border-green-500/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feedback.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-200">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Areas for Improvement */}
              <Card className="bg-yellow-900/20 border-yellow-500/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-yellow-400" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feedback.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-200">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Question Analysis */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                  Question-by-Question Analysis
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Detailed feedback on each question and answer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {feedback.questionAnalysis.map((analysis, index) => (
                    <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-semibold">Question {index + 1}</h4>
                        <Badge className={`${getScoreBg(analysis.score)} ${getScoreColor(analysis.score)}`}>
                          {analysis.score}%
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h5 className="text-gray-300 font-medium mb-2">Question:</h5>
                          <p className="text-gray-200 bg-slate-600/50 p-3 rounded">{analysis.question}</p>
                        </div>

                        <div>
                          <h5 className="text-gray-300 font-medium mb-2">Your Answer:</h5>
                          <p className="text-gray-200 bg-slate-600/50 p-3 rounded">{analysis.userAnswer}</p>
                        </div>

                        <div>
                          <h5 className="text-gray-300 font-medium mb-2">Feedback:</h5>
                          <p className="text-gray-200">{analysis.feedback}</p>
                        </div>

                        <div>
                          <h5 className="text-gray-300 font-medium mb-2">Ideal Answer:</h5>
                          <p className="text-gray-200 bg-green-900/20 p-3 rounded border border-green-500/30">
                            {analysis.idealAnswer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-blue-900/20 border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-blue-400" />
                  Recommendations
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Next steps to improve your interview performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {feedback.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-200">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Link href="/dashboard/mock-interviews">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Brain className="w-4 h-4 mr-2" />
                  Try Another Interview
                </Button>
              </Link>
              <Link href="/interview-guides">
                <Button variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent">
                  Study Interview Guides
                </Button>
              </Link>
              <Link href="/dashboard/problems">
                <Button variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent">
                  Practice Problems
                </Button>
              </Link>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
