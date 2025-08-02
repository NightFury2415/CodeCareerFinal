import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, Briefcase, Code, Brain, Calendar, Search } from "lucide-react"

export function DashboardContent() {
  return (
    <SidebarInset className="flex-1">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4">
        <SidebarTrigger className="text-white" />
        <div className="flex items-center gap-2 px-4">
          <h1 className="text-xl font-semibold text-white">Dashboard</h1>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-6 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome back, John! 👋</h2>
          <p className="text-gray-300 mb-4">
            Ready to take your career to the next level? Here's your progress overview.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Start Mock Interview
            </Button>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-300 hover:bg-purple-500/10 bg-transparent"
            >
              Browse Jobs
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Problems Solved</CardTitle>
              <Code className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">127</div>
              <p className="text-xs text-gray-400">
                <span className="text-green-500">+12</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Global Rank</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">#1,247</div>
              <p className="text-xs text-gray-400">
                <span className="text-green-500">↑ 23</span> positions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Job Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">8</div>
              <p className="text-xs text-gray-400">
                <span className="text-blue-500">3</span> pending responses
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Interview Score</CardTitle>
              <Brain className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">85%</div>
              <p className="text-xs text-gray-400">
                <span className="text-green-500">+5%</span> improvement
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">Your latest achievements and progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-slate-700/50 rounded-lg">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Code className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Solved "Two Sum" problem</p>
                    <p className="text-sm text-gray-400">Completed in 3:42 - New personal best!</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                    Easy
                  </Badge>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-slate-700/50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Applied to Software Engineer at Google</p>
                    <p className="text-sm text-gray-400">Application submitted successfully</p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                    Applied
                  </Badge>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-slate-700/50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Brain className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Completed Mock Interview</p>
                    <p className="text-sm text-gray-400">Frontend Developer role - Score: 88%</p>
                  </div>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                    Excellent
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Progress */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Brain className="w-4 h-4 mr-2" />
                  Start Mock Interview
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                >
                  <Code className="w-4 h-4 mr-2" />
                  Practice Coding
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Jobs
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                >
                  <Target className="w-4 h-4 mr-2" />
                  View Big 6 Guides
                </Button>
              </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Weekly Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Coding Problems</span>
                    <span className="text-gray-400">7/10</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Job Applications</span>
                    <span className="text-gray-400">3/5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Mock Interviews</span>
                    <span className="text-gray-400">2/3</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming Events */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-white font-medium">Google Interview</span>
                </div>
                <p className="text-sm text-gray-400">Tomorrow, 2:00 PM</p>
                <p className="text-xs text-gray-500">Technical Round</p>
              </div>
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-white font-medium">Coding Contest</span>
                </div>
                <p className="text-sm text-gray-400">Friday, 6:00 PM</p>
                <p className="text-xs text-gray-500">Weekly Challenge</p>
              </div>
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white font-medium">Career Workshop</span>
                </div>
                <p className="text-sm text-gray-400">Next Monday, 7:00 PM</p>
                <p className="text-xs text-gray-500">Resume Tips</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
