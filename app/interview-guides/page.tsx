import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Users, Star, Play, Target, Brain } from "lucide-react"
import Link from "next/link"

const interviewGuides = [
  {
    id: 1,
    title: "Technical Interview Fundamentals",
    description:
      "Master the basics of technical interviews including data structures, algorithms, and problem-solving strategies.",
    duration: "4 hours",
    difficulty: "Beginner",
    rating: 4.8,
    students: 12500,
    progress: 0,
    topics: ["Data Structures", "Algorithms", "Problem Solving", "Time Complexity"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "System Design Interview Guide",
    description: "Learn how to design scalable systems and ace system design interviews at top tech companies.",
    duration: "6 hours",
    difficulty: "Advanced",
    rating: 4.9,
    students: 8900,
    progress: 25,
    topics: ["Scalability", "Load Balancing", "Databases", "Microservices"],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Behavioral Interview Mastery",
    description: "Perfect your behavioral interview skills using the STAR method and compelling storytelling.",
    duration: "3 hours",
    difficulty: "Intermediate",
    rating: 4.7,
    students: 15200,
    progress: 60,
    topics: ["STAR Method", "Leadership", "Conflict Resolution", "Career Goals"],
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    title: "Frontend Interview Deep Dive",
    description: "Comprehensive guide covering JavaScript, React, CSS, and frontend system design.",
    duration: "5 hours",
    difficulty: "Intermediate",
    rating: 4.6,
    students: 9800,
    progress: 0,
    topics: ["JavaScript", "React", "CSS", "Performance", "Testing"],
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    title: "Backend Engineering Interviews",
    description: "Master backend concepts including APIs, databases, caching, and distributed systems.",
    duration: "7 hours",
    difficulty: "Advanced",
    rating: 4.8,
    students: 7600,
    progress: 15,
    topics: ["APIs", "Databases", "Caching", "Distributed Systems"],
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 6,
    title: "Product Manager Interview Guide",
    description: "Learn product thinking, market analysis, and stakeholder management for PM roles.",
    duration: "4 hours",
    difficulty: "Intermediate",
    rating: 4.5,
    students: 5400,
    progress: 0,
    topics: ["Product Strategy", "Market Analysis", "User Research", "Metrics"],
    color: "from-pink-500 to-rose-500",
  },
]

const quickTips = [
  {
    title: "Research the Company",
    description: "Spend at least 2 hours researching the company's mission, values, and recent news.",
    icon: Target,
  },
  {
    title: "Practice Out Loud",
    description: "Practice explaining your solutions verbally, not just in your head.",
    icon: Users,
  },
  {
    title: "Prepare Questions",
    description: "Have 3-5 thoughtful questions ready to ask your interviewer.",
    icon: Brain,
  },
  {
    title: "Mock Interviews",
    description: "Do at least 3 mock interviews before your real interview.",
    icon: Play,
  },
]

export default function InterviewGuidesPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4">
            <SidebarTrigger className="text-white" />
            <div className="flex items-center gap-2 px-4">
              <h1 className="text-xl font-semibold text-white">Interview Guides</h1>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-6">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Master Every Interview</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Comprehensive guides and strategies to help you succeed in technical, behavioral, and system design
                interviews
              </p>
            </div>

            {/* Quick Tips */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-white">Quick Interview Tips</CardTitle>
                <CardDescription className="text-gray-300">
                  Essential tips that can make or break your interview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickTips.map((tip, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <tip.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">{tip.title}</h3>
                      <p className="text-sm text-gray-300">{tip.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interview Guides Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interviewGuides.map((guide) => (
                <Card
                  key={guide.id}
                  className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`w-3 h-3 bg-gradient-to-r ${guide.color} rounded-full`}></div>
                          <Badge
                            variant="secondary"
                            className={`text-xs ${
                              guide.difficulty === "Beginner"
                                ? "bg-green-500/20 text-green-400"
                                : guide.difficulty === "Intermediate"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {guide.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-white mb-2">{guide.title}</CardTitle>
                        <CardDescription className="text-gray-400 mb-4">{guide.description}</CardDescription>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {guide.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {guide.students.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {guide.rating}
                      </div>
                    </div>

                    {guide.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-300">Progress</span>
                          <span className="text-gray-400">{guide.progress}%</span>
                        </div>
                        <Progress value={guide.progress} className="h-2" />
                      </div>
                    )}

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white mb-2">Topics Covered</h4>
                      <div className="flex flex-wrap gap-2">
                        {guide.topics.map((topic) => (
                          <Badge key={topic} variant="outline" className="border-slate-600 text-gray-300 text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex gap-2">
                      <Link href={`/interview-guides/${guide.id}`} className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                          <BookOpen className="w-4 h-4 mr-2" />
                          {guide.progress > 0 ? "Continue" : "Start Guide"}
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-500 text-purple-300 hover:bg-purple-500/10 bg-transparent"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Study Plan */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recommended Study Path</CardTitle>
                <CardDescription className="text-gray-400">
                  Follow this structured path for maximum interview success
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      ✓
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">Week 1-2: Fundamentals</h3>
                      <p className="text-sm text-gray-400">Master data structures and algorithms basics</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg border-l-4 border-purple-500">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">Week 3-4: Behavioral Prep</h3>
                      <p className="text-sm text-gray-400">Practice STAR method and prepare stories</p>
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-400">In Progress</Badge>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">Week 5-6: System Design</h3>
                      <p className="text-sm text-gray-400">Learn to design scalable systems</p>
                    </div>
                    <Badge variant="outline" className="border-slate-600 text-gray-400">
                      Upcoming
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">Week 7-8: Mock Interviews</h3>
                      <p className="text-sm text-gray-400">Practice with AI and peer interviews</p>
                    </div>
                    <Badge variant="outline" className="border-slate-600 text-gray-400">
                      Upcoming
                    </Badge>
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
