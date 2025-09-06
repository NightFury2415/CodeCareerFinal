"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Play, Settings, Brain, Target, Clock, TrendingUp, Plus } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function MockInterviewsPage() {
  const router = useRouter()
  const [showSetup, setShowSetup] = useState(false)
  const [isStarting, setIsStarting] = useState(false)

  // Interview setup form state
  const [jobTitle, setJobTitle] = useState("")
  const [jobLevel, setJobLevel] = useState("")
  const [company, setCompany] = useState("")
  const [interviewType, setInterviewType] = useState("")
  const [focusAreas, setFocusAreas] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")

  const interviewTypes = [
    {
      id: "behavioral",
      title: "Behavioral Interview",
      description: "STAR method questions about past experiences",
      icon: "🤝",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "technical",
      title: "Technical Interview",
      description: "Coding problems and technical concepts",
      icon: "💻",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "system-design",
      title: "System Design",
      description: "Architecture and scalability discussions",
      icon: "🏗️",
      color: "from-orange-500 to-red-500",
    },
    {
      id: "product",
      title: "Product Interview",
      description: "Product strategy and case studies",
      icon: "📱",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "leadership",
      title: "Leadership Interview",
      description: "Management and team leadership scenarios",
      icon: "👥",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "case-study",
      title: "Case Study",
      description: "Business cases and problem-solving",
      icon: "📊",
      color: "from-teal-500 to-blue-500",
    },
  ]

  const handleStartInterview = async () => {
    if (!jobTitle || !jobLevel || !interviewType) {
      alert("Please fill in all required fields")
      return
    }

    setIsStarting(true)

    try {
      const response = await fetch("/api/mock-interviews/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          jobLevel,
          company: company || "General",
          interviewType,
          focusAreas,
          additionalInfo,
          userId: "current-user-id",
        }),
      })

      const data = await response.json()

      if (data.interviewId) {
        router.push(`/mock-interviews/${data.interviewId}`)
      }
    } catch (error) {
      console.error("Failed to start interview:", error)
      alert("Failed to start interview. Please try again.")
    } finally {
      setIsStarting(false)
    }
  }

  const resetForm = () => {
    setJobTitle("")
    setJobLevel("")
    setCompany("")
    setInterviewType("")
    setFocusAreas("")
    setAdditionalInfo("")
    setShowSetup(false)
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
              <h1 className="text-xl font-semibold text-white">AI Mock Interviews</h1>
            </div>
          </header>

          <div className="flex-1 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              {!showSetup ? (
                <>
                  {/* Hero Section */}
                  <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-800/50">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-3xl font-bold text-white mb-2">AI-Powered Mock Interviews</CardTitle>
                      <CardDescription className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Practice with our advanced AI interviewer that adapts to your role, experience level, and target
                        company. Get personalized feedback and improve your interview skills.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Button
                        onClick={() => setShowSetup(true)}
                        size="lg"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-4"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Start Mock Interview
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gray-900/50 border-gray-800">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Brain className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">AI-Powered Questions</h3>
                        <p className="text-gray-400 text-sm">
                          Dynamic questions tailored to your role, experience, and target company
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-gray-800">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Target className="w-6 h-6 text-green-400" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Personalized Feedback</h3>
                        <p className="text-gray-400 text-sm">
                          Detailed analysis of your responses with strengths and improvement areas
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-gray-800">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <TrendingUp className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Track Progress</h3>
                        <p className="text-gray-400 text-sm">
                          Monitor your improvement over time with detailed performance analytics
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Interview Types */}
                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Interview Types</CardTitle>
                      <CardDescription className="text-gray-400">
                        Choose from various interview formats to match your preparation needs
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {interviewTypes.map((type) => (
                          <Card
                            key={type.id}
                            className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-colors"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3 mb-3">
                                <div
                                  className={`w-10 h-10 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center text-xl`}
                                >
                                  {type.icon}
                                </div>
                                <div>
                                  <h4 className="text-white font-medium">{type.title}</h4>
                                </div>
                              </div>
                              <p className="text-gray-400 text-sm">{type.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Interviews */}
                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Recent Interviews</CardTitle>
                      <CardDescription className="text-gray-400">
                        Your interview history and performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-gray-400">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg mb-2">No interviews yet</p>
                        <p className="text-sm mb-6">Start your first mock interview to begin tracking your progress</p>
                        <Button onClick={() => setShowSetup(true)} className="bg-purple-600 hover:bg-purple-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Start Your First Interview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                /* Interview Setup Form */
                <Card className="bg-gray-900/50 border-gray-800 max-w-3xl mx-auto">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Settings className="w-6 h-6 text-purple-400" />
                      <div>
                        <CardTitle className="text-white">Interview Setup</CardTitle>
                        <CardDescription className="text-gray-400">
                          Configure your mock interview preferences
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="jobTitle" className="text-gray-300">
                          Job Title *
                        </Label>
                        <Input
                          id="jobTitle"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                          placeholder="e.g., Software Engineer, Product Manager"
                        />
                      </div>
                      <div>
                        <Label htmlFor="jobLevel" className="text-gray-300">
                          Experience Level *
                        </Label>
                        <Select value={jobLevel} onValueChange={setJobLevel}>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                            <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                            <SelectItem value="senior">Senior Level (5-8 years)</SelectItem>
                            <SelectItem value="lead">Lead/Principal (8+ years)</SelectItem>
                            <SelectItem value="executive">Executive/Director</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="company" className="text-gray-300">
                          Target Company (Optional)
                        </Label>
                        <Input
                          id="company"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                          placeholder="e.g., Google, Meta, Amazon"
                        />
                      </div>
                      <div>
                        <Label htmlFor="interviewType" className="text-gray-300">
                          Interview Type *
                        </Label>
                        <Select value={interviewType} onValueChange={setInterviewType}>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select interview type" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            {interviewTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.icon} {type.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="focusAreas" className="text-gray-300">
                        Focus Areas
                      </Label>
                      <Input
                        id="focusAreas"
                        value={focusAreas}
                        onChange={(e) => setFocusAreas(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                        placeholder="e.g., algorithms, system design, leadership, communication"
                      />
                      <p className="text-gray-500 text-sm mt-1">
                        Specify topics you want to emphasize (comma-separated)
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="additionalInfo" className="text-gray-300">
                        Additional Information
                      </Label>
                      <Textarea
                        id="additionalInfo"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white focus:border-purple-500 min-h-[80px]"
                        placeholder="Any specific requirements, technologies, or scenarios you want to focus on..."
                      />
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      <h4 className="text-white font-medium mb-2 flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-purple-400" />
                        Interview Format
                      </h4>
                      <ul className="text-gray-400 text-sm space-y-1">
                        <li>• 10 questions total</li>
                        <li>• AI-powered dynamic questioning</li>
                        <li>• Real-time feedback and follow-ups</li>
                        <li>• Comprehensive performance report</li>
                        <li>• Estimated duration: 30-45 minutes</li>
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <Button
                        onClick={resetForm}
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleStartInterview}
                        disabled={isStarting || !jobTitle || !jobLevel || !interviewType}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {isStarting ? "Starting Interview..." : "Start Interview"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
