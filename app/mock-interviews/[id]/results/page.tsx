"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Star,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Download,
  Share,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function InterviewResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [results, setResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    generateResults()
  }, [])

  const generateResults = async () => {
    // Mock results generation - in real app, this would call your AI analysis API
    setTimeout(() => {
      const mockResults = {
        overallScore: 85,
        breakdown: {
          communication: 88,
          problemSolving: 82,
          leadership: 87,
          technicalKnowledge: 83,
          culturalFit: 86,
        },
        questionScores: [
          {
            question: "Tell me about a time when you had to work under pressure to meet a tight deadline.",
            score: 90,
            feedback: "Excellent use of the STAR method. Your example was specific and showed clear results.",
          },
          {
            question: "Describe a situation where you had to resolve a conflict with a team member.",
            score: 85,
            feedback:
              "Good conflict resolution approach. Could have elaborated more on the long-term relationship impact.",
          },
          {
            question: "Give me an example of when you had to learn something new quickly.",
            score: 88,
            feedback:
              "Great demonstration of learning agility. The specific timeline and outcome were well articulated.",
          },
          {
            question: "Tell me about a project you're particularly proud of and why.",
            score: 92,
            feedback: "Outstanding response! Clear passion and detailed technical explanation with measurable impact.",
          },
          {
            question: "Describe a time when you had to give difficult feedback to someone.",
            score: 78,
            feedback: "Decent approach but could have shown more empathy and follow-up actions.",
          },
          {
            question: "Tell me about a mistake you made and how you handled it.",
            score: 87,
            feedback: "Honest and reflective response. Good demonstration of accountability and learning.",
          },
          {
            question: "Describe a situation where you had to influence someone without authority.",
            score: 83,
            feedback:
              "Solid influence tactics shown. Could have mentioned more about understanding the other person's perspective.",
          },
          {
            question: "Give me an example of when you went above and beyond your job requirements.",
            score: 89,
            feedback: "Impressive initiative! Clear business impact and proactive thinking demonstrated.",
          },
          {
            question: "Tell me about a time when you had to adapt to a significant change.",
            score: 81,
            feedback: "Good adaptability shown. Could have discussed how you helped others adapt as well.",
          },
          {
            question: "Describe a situation where you had to work with a difficult stakeholder.",
            score: 84,
            feedback: "Professional approach demonstrated. Good stakeholder management techniques mentioned.",
          },
        ],
        strengths: [
          "Excellent use of the STAR method in responses",
          "Strong specific examples with measurable outcomes",
          "Clear communication and structured thinking",
          "Good demonstration of leadership qualities",
          "Honest and reflective about challenges and mistakes",
        ],
        improvements: [
          "Could provide more detail on long-term relationship impacts",
          "Show more empathy when discussing difficult conversations",
          "Elaborate on how you help others during changes",
          "Include more stakeholder perspective considerations",
          "Add more quantifiable metrics where possible",
        ],
        idealAnswers: [
          {
            question: "Tell me about a time when you had to work under pressure to meet a tight deadline.",
            ideal:
              "An ideal answer would include: (1) Specific context and timeline, (2) Clear actions taken to prioritize and organize work, (3) How you communicated with stakeholders, (4) Measurable results achieved, (5) What you learned for future situations. Your answer was strong but could have included more about stakeholder communication.",
          },
          {
            question: "Describe a situation where you had to resolve a conflict with a team member.",
            ideal:
              "The best responses include: (1) Understanding both perspectives, (2) Active listening techniques used, (3) Collaborative solution finding, (4) Follow-up to ensure resolution, (5) Long-term relationship improvement. Consider adding more about the relationship outcome.",
          },
        ],
        nextSteps: [
          "Practice incorporating more quantifiable metrics in your examples",
          "Work on showing empathy and emotional intelligence in difficult situations",
          "Prepare examples that demonstrate helping others through change",
          "Focus on stakeholder management and perspective-taking",
          "Continue using the STAR method - you're doing this very well",
        ],
      }
      setResults(mockResults)
      setIsLoading(false)
    }, 2000)
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

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen bg-gray-950">
          <AppSidebar />
          <SidebarInset className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <div className="text-white">Analyzing your interview performance...</div>
            </div>
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
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <h1 className="text-xl font-semibold text-white">Interview Results</h1>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button
                onClick={() => router.push("/mock-interviews")}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Interviews
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Share className="w-4 h-4 mr-2" />
                Share Results
              </Button>
            </div>
          </header>

          <div className="flex-1 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Overall Score */}
              <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-800/50">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{results.overallScore}</span>
                  </div>
                  <CardTitle className="text-white text-2xl">Overall Interview Score</CardTitle>
                  <CardDescription className="text-gray-300">
                    Great performance! You demonstrated strong skills across multiple areas.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Score Breakdown */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Performance Breakdown</CardTitle>
                  <CardDescription className="text-gray-400">
                    Detailed analysis of your performance across key competencies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {Object.entries(results.breakdown).map(([category, score]) => (
                      <div key={category} className="text-center">
                        <div
                          className={`w-16 h-16 ${getScoreBg(score as number)} rounded-full flex items-center justify-center mx-auto mb-2`}
                        >
                          <span className={`text-xl font-bold ${getScoreColor(score as number)}`}>{score}</span>
                        </div>
                        <h4 className="text-white font-medium capitalize">
                          {category.replace(/([A-Z])/g, " $1").trim()}
                        </h4>
                        <Progress value={score as number} className="mt-2 h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Question-by-Question Analysis */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Question Analysis</CardTitle>
                  <CardDescription className="text-gray-400">
                    Detailed feedback for each interview question
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {results.questionScores.map((item: any, index: number) => (
                    <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-1">Question {index + 1}</h4>
                          <p className="text-gray-400 text-sm">{item.question}</p>
                        </div>
                        <Badge className={`${getScoreBg(item.score)} ${getScoreColor(item.score)} ml-4`}>
                          {item.score}/100
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm">{item.feedback}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Strengths and Improvements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {results.strengths.map((strength: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <TrendingDown className="w-5 h-5 mr-2 text-orange-400" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {results.improvements.map((improvement: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Ideal Answers */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    Ideal Answer Examples
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Learn what makes a perfect response to these types of questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {results.idealAnswers.map((item: any, index: number) => (
                    <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h4 className="text-white font-medium mb-2">{item.question}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.ideal}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800/50">
                <CardHeader>
                  <CardTitle className="text-white">Next Steps for Improvement</CardTitle>
                  <CardDescription className="text-gray-300">
                    Actionable recommendations to enhance your interview performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {results.nextSteps.map((step: string, index: number) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-blue-400 text-sm font-bold">{index + 1}</span>
                        </div>
                        <span className="text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <Button onClick={() => router.push("/mock-interviews")} className="bg-purple-600 hover:bg-purple-700">
                  Practice Another Interview
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                  Save to Profile
                </Button>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
