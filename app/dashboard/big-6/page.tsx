"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Building, Users, DollarSign, BookOpen, Clock, TrendingUp, Target, Trophy, ArrowRight } from "lucide-react"
import Link from "next/link"

const companies = [
  {
    id: "google",
    name: "Google",
    logo: "G",
    color: "from-blue-500 to-green-500",
    difficulty: "Very Hard",
    avgSalary: "$280k",
    interviewRounds: 5,
    completionRate: 78,
    description: "Master system design, algorithms, and Googleyness",
    keyFocus: ["System Design", "Algorithms", "Googleyness", "Scale"],
    recentHires: "2,847",
    trending: true,
  },
  {
    id: "apple",
    name: "Apple",
    logo: "A",
    color: "from-gray-500 to-gray-700",
    difficulty: "Hard",
    avgSalary: "$260k",
    interviewRounds: 4,
    completionRate: 82,
    description: "Focus on product thinking and technical excellence",
    keyFocus: ["Product Design", "iOS Development", "User Experience", "Innovation"],
    recentHires: "1,923",
    trending: false,
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "M",
    color: "from-blue-600 to-blue-800",
    difficulty: "Hard",
    avgSalary: "$250k",
    interviewRounds: 4,
    completionRate: 85,
    description: "Emphasizes collaboration and growth mindset",
    keyFocus: ["Cloud Computing", "Collaboration", "Growth Mindset", "Azure"],
    recentHires: "3,156",
    trending: true,
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "A",
    color: "from-orange-500 to-yellow-500",
    difficulty: "Hard",
    avgSalary: "$240k",
    interviewRounds: 5,
    completionRate: 75,
    description: "Leadership principles and customer obsession",
    keyFocus: ["Leadership Principles", "Customer Obsession", "Scale", "AWS"],
    recentHires: "4,892",
    trending: true,
  },
  {
    id: "meta",
    name: "Meta",
    logo: "M",
    color: "from-blue-500 to-purple-600",
    difficulty: "Very Hard",
    avgSalary: "$270k",
    interviewRounds: 5,
    completionRate: 72,
    description: "Building for the next billion users",
    keyFocus: ["Social Scale", "Product Thinking", "Impact", "Innovation"],
    recentHires: "1,634",
    trending: false,
  },
  {
    id: "netflix",
    name: "Netflix",
    logo: "N",
    color: "from-red-600 to-red-800",
    difficulty: "Very Hard",
    avgSalary: "$350k",
    interviewRounds: 6,
    completionRate: 68,
    description: "High performance culture and freedom",
    keyFocus: ["High Performance", "Streaming", "Data Science", "Culture"],
    recentHires: "567",
    trending: false,
  },
]

const Big6Page = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4">
            <SidebarTrigger className="text-white" />
            <div className="flex items-center gap-2 px-4">
              <h1 className="text-xl font-semibold text-white">Big 6 Tech Companies</h1>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-6">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <h1 className="text-4xl font-bold text-white">Big 6 Tech Giants</h1>
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                Master the interview processes of the world's most prestigious tech companies. Get company-specific
                preparation guides, practice problems, and insider tips.
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Building className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">6</div>
                  <div className="text-sm text-gray-400">Top Companies</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">15,019</div>
                  <div className="text-sm text-gray-400">Recent Hires</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">$275k</div>
                  <div className="text-sm text-gray-400">Avg Total Comp</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">77%</div>
                  <div className="text-sm text-gray-400">Avg Success Rate</div>
                </CardContent>
              </Card>
            </div>

            {/* Companies Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {companies.map((company) => (
                <Card
                  key={company.id}
                  className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${company.color} rounded-lg flex items-center justify-center text-white font-bold text-xl`}
                        >
                          {company.logo}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-white">{company.name}</CardTitle>
                            {company.trending && (
                              <Badge className="bg-green-500/20 text-green-400 text-xs">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-gray-400">{company.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Key Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Difficulty:</span>
                        <Badge
                          variant="outline"
                          className={`${
                            company.difficulty === "Very Hard"
                              ? "border-red-500 text-red-400"
                              : "border-yellow-500 text-yellow-400"
                          }`}
                        >
                          {company.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Avg Salary:</span>
                        <span className="text-green-400 font-semibold">{company.avgSalary}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Rounds:</span>
                        <span className="text-white">{company.interviewRounds}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Recent Hires:</span>
                        <span className="text-blue-400">{company.recentHires}</span>
                      </div>
                    </div>

                    {/* Success Rate */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Success Rate</span>
                        <span className="text-white">{company.completionRate}%</span>
                      </div>
                      <Progress value={company.completionRate} className="h-2" />
                    </div>

                    {/* Key Focus Areas */}
                    <div className="space-y-2">
                      <span className="text-sm text-gray-400">Key Focus Areas:</span>
                      <div className="flex flex-wrap gap-2">
                        {company.keyFocus.map((focus, index) => (
                          <Badge key={index} variant="secondary" className="bg-slate-700 text-gray-300 text-xs">
                            {focus}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <Link href={`/dashboard/big-6/${company.id}`} className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Study Guide
                        </Button>
                      </Link>
                      <Link href="/dashboard/mock-interviews">
                        <Button
                          variant="outline"
                          className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Mock Interview
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bottom CTA */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Land Your Dream Job?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Join thousands of engineers who have successfully landed offers at top tech companies using our
                  comprehensive preparation platform.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href="/problems">
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Start Practicing Problems
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/dashboard/mock-interviews">
                    <Button
                      variant="outline"
                      className="border-purple-500 text-purple-300 hover:bg-purple-500/10 bg-transparent"
                    >
                      Take Mock Interview
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export default Big6Page
