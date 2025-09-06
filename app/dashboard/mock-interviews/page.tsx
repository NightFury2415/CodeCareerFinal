"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Brain, Play, Target, Zap, Trophy } from "lucide-react"
import Link from "next/link"

const companies = [
  "Google",
  "Meta",
  "Amazon",
  "Apple",
  "Microsoft",
  "Netflix",
  "Tesla",
  "Uber",
  "Airbnb",
  "Stripe",
  "Spotify",
  "Twitter",
  "LinkedIn",
  "Salesforce",
  "Adobe",
  "Other",
]

const experienceLevels = [
  { value: "entry", label: "Entry Level (0-2 years)" },
  { value: "mid", label: "Mid Level (3-5 years)" },
  { value: "senior", label: "Senior Level (6+ years)" },
  { value: "lead", label: "Lead/Principal (8+ years)" },
]

const durations = [
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "1 hour" },
]

const recentInterviews = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
    company: "Google",
    score: 85,
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: 2,
    jobTitle: "Full Stack Engineer",
    company: "Meta",
    score: 78,
    date: "2024-01-12",
    status: "completed",
  },
  {
    id: 3,
    jobTitle: "Software Engineer",
    company: "Amazon",
    score: 92,
    date: "2024-01-10",
    status: "completed",
  },
]

export default function MockInterviewsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    jobTitle: "",
    experienceLevel: "",
    company: "",
    duration: "45",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setError("")
  }

  const handleStartInterview = async () => {
    if (!formData.jobTitle || !formData.experienceLevel || !formData.company) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/mock-interviews/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Check content type
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text()
        console.error("Non-JSON response:", text)
        throw new Error("Server returned non-JSON response")
      }

      const data = await response.json()

      if (data.success && data.interviewId) {
        router.push(`/dashboard/mock-interviews/${data.interviewId}`)
      } else {
        throw new Error(data.error || "Failed to create interview")
      }
    } catch (error) {
      console.error("Error starting interview:", error)
      setError(`Failed to start interview: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4">
            <SidebarTrigger className="text-white" />
            <div className="flex items-center gap-2 px-4">
              <Brain className="w-5 h-5 text-purple-400" />
              <h1 className="text-xl font-semibold text-white">Mock Interviews</h1>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-6">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">AI-Powered Mock Interviews</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Practice with our AI interviewer and get real-time feedback to improve your interview skills
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Setup Form */}
              <div className="lg:col-span-2">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-400" />
                      Interview Setup
                    </CardTitle>
                    <CardDescription className="text-gray-400">Configure your mock interview session</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {error && (
                      <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                        {error}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="jobTitle" className="text-white">
                        Job Title *
                      </Label>
                      <Input
                        id="jobTitle"
                        placeholder="e.g., Software Engineer, Frontend Developer"
                        value={formData.jobTitle}
                        onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experienceLevel" className="text-white">
                        Experience Level *
                      </Label>
                      <Select
                        value={formData.experienceLevel}
                        onValueChange={(value) => handleInputChange("experienceLevel", value)}
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          {experienceLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value} className="text-white hover:bg-slate-600">
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-white">
                        Target Company *
                      </Label>
                      <Select value={formData.company} onValueChange={(value) => handleInputChange("company", value)}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select target company" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          {companies.map((company) => (
                            <SelectItem key={company} value={company} className="text-white hover:bg-slate-600">
                              {company}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-white">
                        Interview Duration
                      </Label>
                      <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          {durations.map((duration) => (
                            <SelectItem
                              key={duration.value}
                              value={duration.value}
                              className="text-white hover:bg-slate-600"
                            >
                              {duration.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={handleStartInterview}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Creating Interview...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start Mock Interview
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Stats & Recent Interviews */}
              <div className="space-y-6">
                {/* Stats */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Your Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Interviews Completed</span>
                      <span className="text-white font-semibold">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Average Score</span>
                      <span className="text-green-400 font-semibold">85%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Best Score</span>
                      <span className="text-purple-400 font-semibold">92%</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Interviews */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Recent Interviews</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentInterviews.map((interview) => (
                      <div key={interview.id} className="p-3 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium text-sm">{interview.jobTitle}</span>
                          <Badge
                            className={`text-xs ${
                              interview.score >= 90
                                ? "bg-green-500/20 text-green-400"
                                : interview.score >= 80
                                  ? "bg-blue-500/20 text-blue-400"
                                  : interview.score >= 70
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {interview.score}%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{interview.company}</span>
                          <span>{new Date(interview.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                    <Link href="/dashboard/mock-interviews/history">
                      <Button
                        variant="outline"
                        className="w-full text-xs border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                      >
                        View All Interviews
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/50">
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Real-time AI Feedback</h3>
                  <p className="text-gray-300 text-sm">Get instant feedback on your answers and communication skills</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/50">
                <CardContent className="p-6 text-center">
                  <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Adaptive Questions</h3>
                  <p className="text-gray-300 text-sm">Questions adapt to your experience level and target role</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/50">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Performance Analytics</h3>
                  <p className="text-gray-300 text-sm">Track your progress and identify areas for improvement</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
