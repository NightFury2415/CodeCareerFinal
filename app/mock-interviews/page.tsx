"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Clock, TrendingUp, Plus, Play, BarChart3 } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function MockInterviewsPage() {
  const router = useRouter()
  const [interviews, setInterviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchInterviews()
  }, [])

  const fetchInterviews = async () => {
    try {
      const response = await fetch("/api/mock-interviews")
      if (response.ok) {
        const data = await response.json()
        setInterviews(data.interviews || [])
      }
    } catch (error) {
      console.error("Failed to fetch interviews:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const startNewInterview = () => {
    router.push("/mock-interviews/new")
  }

  const viewInterview = (id: string) => {
    router.push(`/mock-interviews/${id}`)
  }

  const viewResults = (id: string) => {
    router.push(`/mock-interviews/${id}/results`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400"
      case "in-progress":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "behavioral":
        return "bg-blue-500/20 text-blue-400"
      case "technical":
        return "bg-purple-500/20 text-purple-400"
      case "system-design":
        return "bg-orange-500/20 text-orange-400"
      case "product":
        return "bg-pink-500/20 text-pink-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
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
              <h1 className="text-xl font-semibold text-white">Mock Interviews</h1>
            </div>
            <div className="ml-auto">
              <Button onClick={startNewInterview} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                New Interview
              </Button>
            </div>
          </header>

          <div className="flex-1 p-6">
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-400">Total Interviews</p>
                        <p className="text-2xl font-bold text-white">{interviews.length}</p>
                      </div>
                      <MessageSquare className="w-8 h-8 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-400">Completed</p>
                        <p className="text-2xl font-bold text-white">
                          {interviews.filter((interview: any) => interview.status === "completed").length}
                        </p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-400">Avg Score</p>
                        <p className="text-2xl font-bold text-white">
                          {interviews.length > 0
                            ? Math.round(
                                interviews.reduce((acc: number, interview: any) => acc + (interview.score || 0), 0) /
                                  interviews.length,
                              )
                            : 0}
                          %
                        </p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Interview History */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Interview History</CardTitle>
                  <CardDescription className="text-gray-400">
                    Track your progress and review past interviews
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8 text-gray-400">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Loading interviews...</p>
                    </div>
                  ) : interviews.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">No interviews yet</p>
                      <p className="text-sm mb-6">Start your first mock interview to practice and improve</p>
                      <Button onClick={startNewInterview} className="bg-purple-600 hover:bg-purple-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Start Your First Interview
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {interviews.map((interview: any) => (
                        <div
                          key={interview.id}
                          className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-purple-400" />
                              </div>
                            </div>
                            <div>
                              <h3 className="text-white font-medium">
                                {interview.role} - {interview.company}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className={getTypeColor(interview.type)}>
                                  {interview.type.replace("-", " ")}
                                </Badge>
                                <Badge className={getStatusColor(interview.status)}>{interview.status}</Badge>
                                <span className="text-sm text-gray-400">{interview.experience} level</span>
                              </div>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{new Date(interview.createdAt).toLocaleDateString()}</span>
                                </div>
                                {interview.score && (
                                  <div className="flex items-center space-x-1">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>{interview.score}% score</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {interview.status === "completed" ? (
                              <Button
                                onClick={() => viewResults(interview.id)}
                                variant="outline"
                                size="sm"
                                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                              >
                                <BarChart3 className="w-4 h-4 mr-2" />
                                View Results
                              </Button>
                            ) : (
                              <Button
                                onClick={() => viewInterview(interview.id)}
                                size="sm"
                                className="bg-purple-600 hover:bg-purple-700"
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Continue
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Start */}
              <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-800/50">
                <CardHeader>
                  <CardTitle className="text-white">Ready to Practice?</CardTitle>
                  <CardDescription className="text-gray-300">
                    Start a new mock interview and get personalized feedback from our AI interviewer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                      <MessageSquare className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <h4 className="text-white font-medium mb-1">Behavioral</h4>
                      <p className="text-sm text-gray-400">STAR method questions</p>
                    </div>
                    <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                      <MessageSquare className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <h4 className="text-white font-medium mb-1">Technical</h4>
                      <p className="text-sm text-gray-400">Coding & algorithms</p>
                    </div>
                    <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                      <MessageSquare className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                      <h4 className="text-white font-medium mb-1">System Design</h4>
                      <p className="text-sm text-gray-400">Architecture questions</p>
                    </div>
                    <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                      <MessageSquare className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                      <h4 className="text-white font-medium mb-1">Product</h4>
                      <p className="text-sm text-gray-400">PM case studies</p>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <Button onClick={startNewInterview} size="lg" className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="w-5 h-5 mr-2" />
                      Start New Interview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
