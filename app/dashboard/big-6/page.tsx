import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Building, Users, DollarSign, Clock, BookOpen, CheckCircle, Target, Brain } from "lucide-react"

const companies = [
  {
    name: "Google",
    logo: "G",
    color: "from-blue-500 to-green-500",
    difficulty: "Very Hard",
    avgSalary: "$280k",
    interviewRounds: 5,
    completionRate: 78,
    description: "Master system design, algorithms, and Googleyness",
    topics: ["System Design", "Algorithms", "Data Structures", "Behavioral"],
  },
  {
    name: "Apple",
    logo: "A",
    color: "from-gray-500 to-gray-700",
    difficulty: "Hard",
    avgSalary: "$260k",
    interviewRounds: 4,
    completionRate: 82,
    description: "Focus on product thinking and technical excellence",
    topics: ["Product Design", "iOS Development", "Hardware", "Leadership"],
  },
  {
    name: "Microsoft",
    logo: "M",
    color: "from-blue-600 to-blue-800",
    difficulty: "Hard",
    avgSalary: "$250k",
    interviewRounds: 4,
    completionRate: 85,
    description: "Emphasizes collaboration and growth mindset",
    topics: ["Cloud Computing", "AI/ML", "Collaboration", "Innovation"],
  },
  {
    name: "Amazon",
    logo: "A",
    color: "from-orange-500 to-yellow-500",
    difficulty: "Hard",
    avgSalary: "$240k",
    interviewRounds: 5,
    completionRate: 75,
    description: "Leadership principles and customer obsession",
    topics: ["Leadership Principles", "System Design", "Behavioral", "Bar Raiser"],
  },
  {
    name: "Meta",
    logo: "M",
    color: "from-blue-500 to-purple-600",
    difficulty: "Very Hard",
    avgSalary: "$270k",
    interviewRounds: 5,
    completionRate: 72,
    description: "Building for the next billion users",
    topics: ["Product Sense", "Execution", "System Design", "Coding"],
  },
  {
    name: "Netflix",
    logo: "N",
    color: "from-red-600 to-red-800",
    difficulty: "Very Hard",
    avgSalary: "$350k",
    interviewRounds: 6,
    completionRate: 68,
    description: "High performance culture and freedom",
    topics: ["Culture Fit", "Technical Excellence", "Innovation", "Results"],
  },
]

export default function Big6Page() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4">
            <SidebarTrigger className="text-white" />
            <div className="flex items-center gap-2 px-4">
              <h1 className="text-xl font-semibold text-white">Big 6 Companies</h1>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-6">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Crack the Big 6</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Comprehensive guides to land your dream job at Google, Apple, Microsoft, Amazon, Meta, and Netflix
              </p>
            </div>

            {/* Overview Stats */}
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
                  <div className="text-2xl font-bold text-white">12K+</div>
                  <div className="text-sm text-gray-400">Success Stories</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">$265k</div>
                  <div className="text-sm text-gray-400">Avg Salary</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">76%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </CardContent>
              </Card>
            </div>

            {/* Company Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companies.map((company) => (
                <Card
                  key={company.name}
                  className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-colors"
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
                          <CardTitle className="text-white">{company.name}</CardTitle>
                          <CardDescription className="text-gray-400">{company.description}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`${
                          company.difficulty === "Very Hard"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-orange-500/20 text-orange-400"
                        }`}
                      >
                        {company.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-white">{company.avgSalary}</div>
                        <div className="text-xs text-gray-400">Avg Salary</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-white">{company.interviewRounds}</div>
                        <div className="text-xs text-gray-400">Rounds</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-white">{company.completionRate}%</div>
                        <div className="text-xs text-gray-400">Success Rate</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Your Progress</span>
                        <span className="text-gray-400">{company.completionRate}%</span>
                      </div>
                      <Progress value={company.completionRate} className="h-2" />
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">Key Topics</h4>
                      <div className="flex flex-wrap gap-2">
                        {company.topics.map((topic) => (
                          <Badge key={topic} variant="outline" className="border-slate-600 text-gray-300 text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Study Guide
                      </Button>
                      <Button
                        variant="outline"
                        className="border-purple-500 text-purple-300 hover:bg-purple-500/10 bg-transparent"
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        Mock Interview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Study Plan */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recommended Study Plan</CardTitle>
                <CardDescription className="text-gray-400">
                  A structured approach to prepare for Big 6 interviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        1
                      </div>
                      <h3 className="font-semibold text-white">Foundation</h3>
                    </div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        Data Structures
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        Algorithms
                      </li>
                      <li className="flex items-center">
                        <Clock className="w-3 h-3 mr-2 text-gray-400" />
                        Time Complexity
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        2
                      </div>
                      <h3 className="font-semibold text-white">Practice</h3>
                    </div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        LeetCode Problems
                      </li>
                      <li className="flex items-center">
                        <Clock className="w-3 h-3 mr-2 text-gray-400" />
                        Mock Interviews
                      </li>
                      <li className="flex items-center">
                        <Clock className="w-3 h-3 mr-2 text-gray-400" />
                        System Design
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        3
                      </div>
                      <h3 className="font-semibold text-white">Behavioral</h3>
                    </div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-center">
                        <Clock className="w-3 h-3 mr-2 text-gray-400" />
                        STAR Method
                      </li>
                      <li className="flex items-center">
                        <Clock className="w-3 h-3 mr-2 text-gray-400" />
                        Leadership Stories
                      </li>
                      <li className="flex items-center">
                        <Clock className="w-3 h-3 mr-2 text-gray-400" />
                        Culture Fit
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        4
                      </div>
                      <h3 className="font-semibold text-white">Final Prep</h3>
                    </div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-center">
                        <Clock className="w-3 h-3 mr-2 text-gray-400" />
                        Company Research
                      </li>
                      <li className="flex items-center">
                        <Clock className="w-3 h-3 mr-2 text-gray-400" />
                        Questions to Ask
                      </li>
                      <li className="flex items-center">
                        <Clock className="w-3 h-3 mr-2 text-gray-400" />
                        Salary Negotiation
                      </li>
                    </ul>
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
