"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Play, Users, Target, Zap } from "lucide-react"
import { useState } from "react"

export default function NewMockInterviewPage() {
  const [selectedType, setSelectedType] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedExperience, setSelectedExperience] = useState("")
  const [selectedCompany, setSelectedCompany] = useState("")
  const [isStarting, setIsStarting] = useState(false)

  const interviewTypes = [
    {
      id: "behavioral",
      title: "Behavioral Interview",
      description: "Leadership, teamwork, and soft skills questions",
      duration: "30-45 min",
      questions: 8,
      icon: "🤝",
    },
    {
      id: "technical",
      title: "Technical Interview",
      description: "Coding problems and algorithmic thinking",
      duration: "45-60 min",
      questions: 6,
      icon: "💻",
    },
    {
      id: "system-design",
      title: "System Design",
      description: "Architecture and scalability discussions",
      duration: "60-90 min",
      questions: 4,
      icon: "🏗️",
    },
    {
      id: "product",
      title: "Product Interview",
      description: "Product thinking and strategy",
      duration: "45-60 min",
      questions: 6,
      icon: "📱",
    },
  ]

  const handleStartInterview = async () => {
    if (!selectedType || !selectedRole || !selectedExperience) {
      alert("Please select interview type, role, and experience level")
      return
    }

    setIsStarting(true)

    try {
      const response = await fetch("/api/mock-interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selectedType,
          role: selectedRole,
          experience: selectedExperience,
          company: selectedCompany || "General",
          userId: "current-user-id",
        }),
      })

      const data = await response.json()

      if (data.interview) {
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
              <Brain className="w-5 h-5 text-purple-400" />
              <h1 className="text-xl font-semibold text-white">New Mock Interview</h1>
            </div>
          </header>

          <div className="flex-1 p-6 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Start Your AI Interview</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Configure your interview settings and get personalized questions based on your target role
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {/* Interview Configuration */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Interview Configuration</CardTitle>
                  <CardDescription className="text-gray-400">Customize your interview experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Target Role</label>
                      <Select value={selectedRole} onValueChange={setSelectedRole}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select your target role" />
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
                          <SelectValue placeholder="Select your experience level" />
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
                        <SelectValue placeholder="Select target company (optional)" />
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
                    className={`bg-slate-800/50 border-slate-700 cursor-pointer transition-all hover:border-purple-500/50 ${
                      selectedType === type.id ? "border-purple-500 bg-purple-500/10" : ""
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{type.icon}</div>
                        <div>
                          <CardTitle className="text-white">{type.title}</CardTitle>
                          <CardDescription className="text-gray-400">{type.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
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
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* AI Features */}
              <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                    AI-Powered Interview Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Brain className="w-6 h-6 text-blue-400" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">Smart Questions</h3>
                      <p className="text-sm text-gray-400">
                        AI generates questions tailored to your role and experience
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Target className="w-6 h-6 text-green-400" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">Real-time Feedback</h3>
                      <p className="text-sm text-gray-400">Get instant guidance and follow-up questions</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6 text-purple-400" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">Company Focus</h3>
                      <p className="text-sm text-gray-400">Questions adapted for your target company's style</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Start Interview */}
              <div className="text-center">
                <Button
                  onClick={handleStartInterview}
                  disabled={isStarting || !selectedType || !selectedRole || !selectedExperience}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-4"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {isStarting ? "Starting Interview..." : "Start AI Interview"}
                </Button>
                <p className="text-gray-400 text-sm mt-4">
                  Make sure you're in a quiet environment and have about{" "}
                  {selectedType === "system-design" ? "60-90" : selectedType === "technical" ? "45-60" : "30-45"}{" "}
                  minutes available
                </p>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
