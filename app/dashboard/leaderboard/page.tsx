import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Clock, Code, Target } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const leaderboardData = [
  {
    rank: 1,
    name: "Alex Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2847,
    problemsSolved: 342,
    avgTime: "4:23",
    streak: 28,
    badge: "Grandmaster",
  },
  {
    rank: 2,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2756,
    problemsSolved: 318,
    avgTime: "5:12",
    streak: 21,
    badge: "Master",
  },
  {
    rank: 3,
    name: "Mike Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2634,
    problemsSolved: 295,
    avgTime: "4:45",
    streak: 15,
    badge: "Master",
  },
  {
    rank: 4,
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2521,
    problemsSolved: 287,
    avgTime: "5:34",
    streak: 12,
    badge: "Expert",
  },
  {
    rank: 5,
    name: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2456,
    problemsSolved: 276,
    avgTime: "6:01",
    streak: 9,
    badge: "Expert",
  },
]

const speedLeaderboard = [
  {
    rank: 1,
    name: "Lightning Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    avgTime: "2:15",
    fastestSolve: "0:47",
    problemsSolved: 156,
  },
  {
    rank: 2,
    name: "Quick Quinn",
    avatar: "/placeholder.svg?height=40&width=40",
    avgTime: "2:34",
    fastestSolve: "0:52",
    problemsSolved: 203,
  },
  {
    rank: 3,
    name: "Rapid Rachel",
    avatar: "/placeholder.svg?height=40&width=40",
    avgTime: "2:41",
    fastestSolve: "0:58",
    problemsSolved: 189,
  },
]

export default function LeaderboardPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4">
            <SidebarTrigger className="text-white" />
            <div className="flex items-center gap-2 px-4">
              <h1 className="text-xl font-semibold text-white">Leaderboard</h1>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-6">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Global Rankings</h2>
              <p className="text-gray-400">Compete with developers worldwide and climb the ranks</p>
            </div>

            {/* Your Rank Card */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold text-white">Your Rank: #1,247</h3>
                      <p className="text-gray-300">John Doe</p>
                      <Badge className="bg-blue-500/20 text-blue-400 mt-1">Advanced</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">1,856 pts</div>
                    <div className="text-sm text-gray-400">127 problems solved</div>
                    <div className="text-sm text-gray-400">Avg time: 5:42</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="overall" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
                <TabsTrigger
                  value="overall"
                  className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-slate-700"
                >
                  Overall Rankings
                </TabsTrigger>
                <TabsTrigger
                  value="speed"
                  className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-slate-700"
                >
                  Speed Champions
                </TabsTrigger>
                <TabsTrigger
                  value="weekly"
                  className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-slate-700"
                >
                  Weekly Contest
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overall" className="space-y-4">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                      Top Performers
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Based on total points, problems solved, and consistency
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaderboardData.map((user, index) => (
                        <div
                          key={user.rank}
                          className={`flex items-center justify-between p-4 rounded-lg ${
                            index < 3
                              ? "bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30"
                              : "bg-slate-700/50"
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-8 h-8">
                              {index === 0 && <Trophy className="w-6 h-6 text-yellow-500" />}
                              {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
                              {index === 2 && <Award className="w-6 h-6 text-orange-500" />}
                              {index > 2 && <span className="text-lg font-bold text-gray-400">#{user.rank}</span>}
                            </div>
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-white">{user.name}</h3>
                              <Badge
                                variant="secondary"
                                className={`text-xs ${
                                  user.badge === "Grandmaster"
                                    ? "bg-red-500/20 text-red-400"
                                    : user.badge === "Master"
                                      ? "bg-purple-500/20 text-purple-400"
                                      : "bg-blue-500/20 text-blue-400"
                                }`}
                              >
                                {user.badge}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-8 text-sm">
                            <div className="text-center">
                              <div className="text-white font-semibold">{user.points.toLocaleString()}</div>
                              <div className="text-gray-400">Points</div>
                            </div>
                            <div className="text-center">
                              <div className="text-white font-semibold">{user.problemsSolved}</div>
                              <div className="text-gray-400">Solved</div>
                            </div>
                            <div className="text-center">
                              <div className="text-white font-semibold">{user.avgTime}</div>
                              <div className="text-gray-400">Avg Time</div>
                            </div>
                            <div className="text-center">
                              <div className="text-white font-semibold">{user.streak}</div>
                              <div className="text-gray-400">Streak</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="speed" className="space-y-4">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-500" />
                      Fastest Solvers
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Developers who solve problems at lightning speed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {speedLeaderboard.map((user, index) => (
                        <div
                          key={user.rank}
                          className={`flex items-center justify-between p-4 rounded-lg ${
                            index < 3
                              ? "bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30"
                              : "bg-slate-700/50"
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-8 h-8">
                              {index === 0 && <Trophy className="w-6 h-6 text-blue-500" />}
                              {index === 1 && <Medal className="w-6 h-6 text-cyan-400" />}
                              {index === 2 && <Award className="w-6 h-6 text-blue-400" />}
                            </div>
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-white">{user.name}</h3>
                              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 text-xs">
                                Speed Demon
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-8 text-sm">
                            <div className="text-center">
                              <div className="text-white font-semibold">{user.avgTime}</div>
                              <div className="text-gray-400">Avg Time</div>
                            </div>
                            <div className="text-center">
                              <div className="text-green-400 font-semibold">{user.fastestSolve}</div>
                              <div className="text-gray-400">Fastest</div>
                            </div>
                            <div className="text-center">
                              <div className="text-white font-semibold">{user.problemsSolved}</div>
                              <div className="text-gray-400">Solved</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="weekly" className="space-y-4">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Target className="w-5 h-5 mr-2 text-green-500" />
                      Weekly Contest Rankings
                    </CardTitle>
                    <CardDescription className="text-gray-400">Current week's competition results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">Contest Ends in 2 Days</h3>
                      <p className="text-gray-400 mb-4">Join the weekly coding contest to compete for prizes!</p>
                      <div className="bg-slate-700/50 rounded-lg p-4 max-w-md mx-auto">
                        <div className="text-2xl font-bold text-green-400 mb-1">$500</div>
                        <div className="text-sm text-gray-400">Prize Pool</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
