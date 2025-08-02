"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Play, Clock, Target, Star, TrendingUp, Users, Zap } from "lucide-react"
import { useState } from "react"

const interviewTypes = [
  {
    id: "behavioral",
    title: "Behavioral Interview",
    description: "Leadership, teamwork, and soft skills questions",
    duration: "30-45 min",
    difficulty: "Easy",
    questions: 8,
    color: "from-green-500 to-emerald-500",
    icon: "🤝",
  },
  {
    id: "technical",
    title: "Technical Interview",
    description: "Coding problems and algorithmic thinking",
    duration: "45-60 min",
    difficulty: "Medium",
    questions: 6,
    color: "from-blue-500 to-cyan-500",
    icon: "💻",
  },
  {
    id: "system-design",
    title: "System Design",
    description: "Architecture and scalability discussions",
    duration: "60-90 min",
    difficulty: "Hard",
    questions: 4,
    color: "from-purple-500 to-pink-500",
    icon: "🏗️",
  },
  {
    id: "product",
    title: "Product Interview",
    description: "Product thinking and strategy",
    duration: "45-60 min",
    difficulty: "Medium",
    questions: 6,
    color: "from-orange-500 to-red-500",
    icon: "📱",
  },
]

const recentSessions = [
  {
    id: 1,
    type: "Technical",
    role: "Software Engineer",
    company: "Google",
    score: 88,
    date: "2 days ago",
    duration: "52 min",
    feedback: "Strong problem-solving skills, could improve on edge cases",
  },
  {
    id: 2,
    type: "Behavioral",
    role: "Product Manager",
    company: "Meta",
    score: 92,
    date: "1 week ago",
    duration: "38 min",
    feedback: "Excellent storytelling, great use of STAR method",
  },
  {
    id: 3,
    type: "System Design",
    role: "Senior Engineer",
    company: "Amazon",
    score: 76,
    date: "2 weeks ago",
    duration: "68 min",
    feedback: "Good high-level design, need to focus on scalability details",
  },
]

export default function MockInterviewsPage() {
  const [selectedType, setSelectedType] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedExperience, setSelectedExperience] = useState("")
  const [selectedCompany, setSelectedCompany] = useState("")
  const [isStarting, setIsStarting] = useState(false)

  const handleStartInterview = async (type: string) => {
    if (!selectedRole || !selectedExperience) {
      alert("Please select both role and experience level")
      return
    }

    setIsStarting(true)

    try {
      const response = await fetch("/api/mock-interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: type || selectedType,
          role: selectedRole,
          experience: selectedExperience,
          company: selectedCompany || "General",
          userId: "current-user-id", // Replace with actual user ID
        }),
      })

      const data = await response.json()

      if (data.interview) {
        // Redirect to interview session
        window.location.href = `/mock-interviews/${data.interview.id}`
      }
    } catch (error) {
      console.error("Failed to start interview:", error)
      alert("Failed to start interview. Please try again.")
    } finally {
      setIsStarting(false)
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
              <h1 className="text-xl font-semibold text-white">Mock AI Interviews</h1>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-6">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Practice with AI Interviewer</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Get personalized feedback and improve your interview skills with our advanced AI system
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">23</div>
                  <div className="text-sm text-gray-400">Interviews Completed</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">85%</div>
                  <div className="text-sm text-gray-400">Average Score</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">+12%</div>
                  <div className="text-sm text-gray-400">Improvement</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">18h</div>
                  <div className="text-sm text-gray-400">Practice Time</div>
                </CardContent>
              </Card>
            </div>

            {/* Interview Setup */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-white">Start New Interview</CardTitle>
                <CardDescription className="text-gray-300">
                  Customize your interview experience based on the role you're targeting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Target Role</label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="software-engineer">Software Engineer</SelectItem>
                        <SelectItem value="senior-engineer">Senior Software Engineer</SelectItem>
                        <SelectItem value="product-manager">Product Manager</SelectItem>
                        <SelectItem value="data-scientist">Data Scientist</SelectItem>
                        <SelectItem value="frontend-engineer">Frontend Engineer</SelectItem>
                        <SelectItem value="backend-engineer">Backend Engineer</SelectItem>
                        <SelectItem value="full-stack-engineer">Full Stack Engineer</SelectItem>
                        <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Experience Level</label>
                    <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                        <SelectItem value="senior">Senior Level (5-8 years)</SelectItem>
                        <SelectItem value="lead">Lead/Principal (8+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Target Company (Optional)</label>
                  <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select company (optional)" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="meta">Meta</SelectItem>
                      <SelectItem value="amazon">Amazon</SelectItem>
                      <SelectItem value="microsoft">Microsoft</SelectItem>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="netflix">Netflix</SelectItem>
                      <SelectItem value="uber">Uber</SelectItem>
                      <SelectItem value="airbnb">Airbnb</SelectItem>
                      <SelectItem value="startup">Startup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Interview Types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interviewTypes.map((type) => (
                <Card
                  key={type.id}
                  className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center text-2xl`}
                        >
                          {type.icon}
                        </div>
                        <div>
                          <CardTitle className="text-white">{type.title}</CardTitle>
                          <CardDescription className="text-gray-400">{type.description}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`${
                          type.difficulty === "Easy"
                            ? "bg-green-500/20 text-green-400"
                            : type.difficulty === "Medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {type.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Duration:</span>
                        <div className="text-white font-medium">{type.duration}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Questions:</span>
                        <div className="text-white font-medium">{type.questions}</div>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      onClick={() => handleStartInterview(type.id)}
                      disabled={isStarting || !selectedRole || !selectedExperience}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isStarting ? "Starting..." : "Start Interview"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Sessions */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Interview Sessions</CardTitle>
                <CardDescription className="text-gray-400">
                  Review your past performance and track improvement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            session.score >= 90
                              ? "bg-green-500/20"
                              : session.score >= 80
                                ? "bg-yellow-500/20"
                                : "bg-red-500/20"
                          }`}
                        >
                          <div
                            className={`text-lg font-bold ${
                              session.score >= 90
                                ? "text-green-400"
                                : session.score >= 80
                                  ? "text-yellow-400"
                                  : "text-red-400"
                            }`}
                          >
                            {session.score}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{session.type} Interview</h3>
                          <p className="text-sm text-gray-400">
                            {session.role} at {session.company}
                          </p>
                          <p className="text-xs text-gray-500">
                            {session.date} • {session.duration}
                          </p>
                        </div>
                      </div>
                      <div className="text-right max-w-xs">
                        <p className="text-sm text-gray-300 mb-2">{session.feedback}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Features */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  AI-Powered Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">Adaptive Questions</h3>
                    <p className="text-sm text-gray-400">AI adjusts difficulty based on your performance</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">Personalized Feedback</h3>
                    <p className="text-sm text-gray-400">Detailed analysis of your strengths and weaknesses</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">Company-Specific</h3>
                    <p className="text-sm text-gray-400">Questions tailored to your target company's style</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
