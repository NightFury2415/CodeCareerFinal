import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Code,
  Palette,
  BarChart3,
  Shield,
  Database,
  Smartphone,
  ArrowRight,
  Clock,
  DollarSign,
  TrendingUp,
} from "lucide-react"

const careerPaths = [
  {
    id: 1,
    title: "Frontend Developer",
    description: "Build user interfaces and experiences for web applications",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    avgSalary: "$85k - $140k",
    growthRate: "+13%",
    timeToLearn: "6-12 months",
    skills: ["HTML/CSS", "JavaScript", "React", "Vue.js", "TypeScript"],
    roadmap: [
      { step: "HTML & CSS Fundamentals", completed: true },
      { step: "JavaScript Basics", completed: true },
      { step: "React Framework", completed: false },
      { step: "State Management", completed: false },
      { step: "Testing & Deployment", completed: false },
    ],
  },
  {
    id: 2,
    title: "Backend Developer",
    description: "Design and build server-side applications and APIs",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    avgSalary: "$90k - $150k",
    growthRate: "+15%",
    timeToLearn: "8-15 months",
    skills: ["Python", "Node.js", "SQL", "APIs", "Cloud Services"],
    roadmap: [
      { step: "Programming Language", completed: true },
      { step: "Database Design", completed: false },
      { step: "API Development", completed: false },
      { step: "Cloud Deployment", completed: false },
      { step: "System Architecture", completed: false },
    ],
  },
  {
    id: 3,
    title: "Data Scientist",
    description: "Extract insights from data using statistics and machine learning",
    icon: BarChart3,
    color: "from-purple-500 to-pink-500",
    avgSalary: "$95k - $165k",
    growthRate: "+22%",
    timeToLearn: "12-24 months",
    skills: ["Python", "R", "SQL", "Machine Learning", "Statistics"],
    roadmap: [
      { step: "Statistics & Math", completed: false },
      { step: "Python/R Programming", completed: false },
      { step: "Data Analysis", completed: false },
      { step: "Machine Learning", completed: false },
      { step: "Deep Learning", completed: false },
    ],
  },
  {
    id: 4,
    title: "UX/UI Designer",
    description: "Design intuitive and beautiful user experiences",
    icon: Palette,
    color: "from-orange-500 to-red-500",
    avgSalary: "$70k - $120k",
    growthRate: "+8%",
    timeToLearn: "6-18 months",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
    roadmap: [
      { step: "Design Principles", completed: false },
      { step: "Design Tools", completed: false },
      { step: "User Research", completed: false },
      { step: "Prototyping", completed: false },
      { step: "Portfolio Building", completed: false },
    ],
  },
  {
    id: 5,
    title: "Mobile Developer",
    description: "Create native and cross-platform mobile applications",
    icon: Smartphone,
    color: "from-indigo-500 to-purple-500",
    avgSalary: "$85k - $145k",
    growthRate: "+19%",
    timeToLearn: "8-16 months",
    skills: ["Swift", "Kotlin", "React Native", "Flutter", "Mobile UI"],
    roadmap: [
      { step: "Mobile Fundamentals", completed: false },
      { step: "Native Development", completed: false },
      { step: "Cross-platform Tools", completed: false },
      { step: "App Store Deployment", completed: false },
      { step: "Performance Optimization", completed: false },
    ],
  },
  {
    id: 6,
    title: "Cybersecurity Specialist",
    description: "Protect systems and data from security threats",
    icon: Shield,
    color: "from-red-500 to-pink-500",
    avgSalary: "$95k - $160k",
    growthRate: "+31%",
    timeToLearn: "12-24 months",
    skills: ["Network Security", "Ethical Hacking", "Risk Assessment", "Compliance", "Incident Response"],
    roadmap: [
      { step: "Security Fundamentals", completed: false },
      { step: "Network Security", completed: false },
      { step: "Ethical Hacking", completed: false },
      { step: "Security Tools", completed: false },
      { step: "Certifications", completed: false },
    ],
  },
]

export default function CareerPathsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4">
            <SidebarTrigger className="text-white" />
            <div className="flex items-center gap-2 px-4">
              <h1 className="text-xl font-semibold text-white">Career Paths</h1>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-6">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Choose Your Career Path</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Explore different tech career paths with personalized roadmaps, salary insights, and skill requirements
              </p>
            </div>

            {/* Career Path Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerPaths.map((path) => (
                <Card
                  key={path.id}
                  className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${path.color} rounded-lg flex items-center justify-center`}
                      >
                        <path.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white">{path.title}</CardTitle>
                        <CardDescription className="text-gray-400">{path.description}</CardDescription>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="flex items-center justify-center mb-1">
                          <DollarSign className="w-4 h-4 text-green-400 mr-1" />
                        </div>
                        <div className="text-sm font-semibold text-white">{path.avgSalary}</div>
                        <div className="text-xs text-gray-400">Avg Salary</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center mb-1">
                          <TrendingUp className="w-4 h-4 text-blue-400 mr-1" />
                        </div>
                        <div className="text-sm font-semibold text-white">{path.growthRate}</div>
                        <div className="text-xs text-gray-400">Growth</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center mb-1">
                          <Clock className="w-4 h-4 text-purple-400 mr-1" />
                        </div>
                        <div className="text-sm font-semibold text-white">{path.timeToLearn}</div>
                        <div className="text-xs text-gray-400">Time</div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">Key Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {path.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="border-slate-600 text-gray-300 text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">Learning Roadmap</h4>
                      <div className="space-y-2">
                        {path.roadmap.slice(0, 3).map((step, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div
                              className={`w-3 h-3 rounded-full ${step.completed ? "bg-green-500" : "bg-gray-600"}`}
                            ></div>
                            <span className={`text-xs ${step.completed ? "text-green-400" : "text-gray-400"}`}>
                              {step.step}
                            </span>
                          </div>
                        ))}
                        <div className="text-xs text-gray-500">+{path.roadmap.length - 3} more steps</div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Start Learning Path
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Personalized Recommendations */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-white">Personalized Recommendations</CardTitle>
                <CardDescription className="text-gray-300">
                  Based on your skills and interests, here are the best career paths for you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Code className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">Best Match: Frontend Developer</h3>
                    <p className="text-sm text-gray-300 mb-4">95% compatibility based on your JavaScript skills</p>
                    <Progress value={95} className="h-2 mb-2" />
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      View Details
                    </Button>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Database className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">Good Fit: Backend Developer</h3>
                    <p className="text-sm text-gray-300 mb-4">78% compatibility with your problem-solving skills</p>
                    <Progress value={78} className="h-2 mb-2" />
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-500 text-green-400 hover:bg-green-500/10 bg-transparent"
                    >
                      Explore Path
                    </Button>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">Consider: Mobile Developer</h3>
                    <p className="text-sm text-gray-300 mb-4">65% compatibility - great growth potential</p>
                    <Progress value={65} className="h-2 mb-2" />
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent"
                    >
                      Learn More
                    </Button>
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
