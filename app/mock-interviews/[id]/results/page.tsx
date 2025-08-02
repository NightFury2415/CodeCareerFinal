"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  TrendingUp,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Download,
  Share2,
  RotateCcw,
} from "lucide-react"
import { useState, useEffect } from "react"

export default function InterviewResultsPage({ params }: { params: { id: string } }) {
  const [interview, setInterview] = useState<any>(null)
  const [feedback, setFeedback] = useState<any>(null)
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(true)

  useEffect(() => {
    fetchInterviewAndGenerateFeedback()
  }, [params.id])

  const fetchInterviewAndGenerateFeedback = async () => {
    try {
      // Fetch interview data
      const interviewResponse = await fetch(`/api/mock-interviews/${params.id}`)
      const interviewData = await interviewResponse.json()
      setInterview(interviewData.interview)

      // Generate AI feedback
      const feedbackResponse = await fetch(`/api/mock-interviews/${params.id}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const feedbackData = await feedbackResponse.json()
      setFeedback(feedbackData.feedback)
    } catch (error) {
      console.error("Failed to fetch results:", error)
    } finally {
      setIsGeneratingFeedback(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400"
    if (score >= 80) return "text-yellow-400"
    if (score >= 70) return "text-orange-400"
    return "text-red-400"
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-500/20"
    if (score >= 80) return "bg-yellow-500/20"
    if (score >= 70) return "bg-orange-500/20"
    return "bg-red-500/20"
  }

  if (!interview || isGeneratingFeedback) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen bg-slate-900">
          <AppSidebar />
          <SidebarInset className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <div className="text-white text-lg">Analyzing your interview performance...</div>
              <div className="text-gray-400 text-sm mt-2">This may take a few moments</div>
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
              <h1 className="text-xl font-semibold text-white">Interview Results</h1>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </header>

          <div className="flex-1 p-6 space-y-6">
            {/* Overall Score */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Interview Complete!</h2>
                    <p className="text-gray-300">
                      {interview.type.charAt(0).toUpperCase() + interview.type.slice(1)} Interview • {interview.role}
                      {interview.company && interview.company !== "General" && ` • ${interview.company}`}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Completed on {new Date(interview.completedAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${getScoreColor(feedback?.overallScore || 85)} mb-2`}>
                      {feedback?.overallScore || 85}
                    </div>
                    <div className="text-gray-300">Overall Score</div>
                    <div className="flex items-center justify-center mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor((feedback?.overallScore || 85) / 20)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{feedback?.scores?.communication || 88}</div>
                  <div className="text-sm text-gray-400">Communication</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{feedback?.scores?.technical || 82}</div>
                  <div className="text-sm text-gray-400">Technical Skills</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{feedback?.scores?.problemSolving || 90}</div>
                  <div className="text-sm text-gray-400">Problem Solving</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{feedback?.duration || "42m"}</div>
                  <div className="text-sm text-gray-400">Duration</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Detailed Feedback */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Detailed Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-white font-semibold mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {(
                        feedback?.strengths || [
                          "Clear and structured responses using STAR method",
                          "Good examples with specific metrics and outcomes",
                          "Strong communication and articulation skills",
                          "Demonstrated leadership and problem-solving abilities",
                        ]
                      ).map((strength: string, index: number) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-2 flex items-center">
                      <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
                      Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {(
                        feedback?.improvements || [
                          "Could provide more specific metrics and quantifiable results",
                          "Consider discussing lessons learned and future applications",
                          "Expand on technical implementation details when relevant",
                        ]
                      ).map((improvement: string, index: number) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Question-by-Question Analysis */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Question Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {interview.questions.map((question: any, index: number) => (
                    <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">Question {index + 1}</h4>
                        <div
                          className={`px-2 py-1 rounded text-xs font-medium ${getScoreBg(feedback?.questionScores?.[index] || 85)} ${getScoreColor(feedback?.questionScores?.[index] || 85)}`}
                        >
                          {feedback?.questionScores?.[index] || 85}/100
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{question.question}</p>
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs text-gray-400 uppercase tracking-wide">Feedback:</span>
                          <p className="text-gray-300 text-sm">
                            {feedback?.questionFeedback?.[index] ||
                              "Good response with clear structure. Consider adding more specific examples and quantifiable outcomes to strengthen your answer."}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* AI Insights */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">AI Insights & Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-white font-semibold mb-3">Interview Performance Trends</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Response Quality</span>
                          <span className="text-white">88%</span>
                        </div>
                        <Progress value={88} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Structure & Clarity</span>
                          <span className="text-white">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Depth of Examples</span>
                          <span className="text-white">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-3">Next Steps</h3>
                    <ul className="space-y-2">
                      {(
                        feedback?.nextSteps || [
                          "Practice more technical system design questions",
                          "Prepare specific metrics for your project examples",
                          "Work on concise storytelling for behavioral questions",
                          "Review common algorithms and data structures",
                        ]
                      ).map((step: string, index: number) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => (window.location.href = "/mock-interviews")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Take Another Interview
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/problems")}
                className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
              >
                Practice Coding Problems
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/dashboard/jobs")}
                className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
              >
                Browse Jobs
              </Button>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
