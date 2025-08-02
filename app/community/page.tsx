import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Users, Calendar, Trophy, Heart, Reply, Search, Plus } from "lucide-react"

const discussions = [
  {
    id: 1,
    title: "How to prepare for Google's system design interview?",
    author: "Alex Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    replies: 23,
    likes: 45,
    tags: ["System Design", "Google", "Interview"],
    timeAgo: "2 hours ago",
    preview: "I have a system design interview coming up at Google. What are the key topics I should focus on?",
  },
  {
    id: 2,
    title: "Best resources for learning React in 2024",
    author: "Sarah Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    replies: 18,
    likes: 32,
    tags: ["React", "Frontend", "Learning"],
    timeAgo: "5 hours ago",
    preview:
      "Looking for updated React learning resources. What would you recommend for someone transitioning from Vue?",
  },
  {
    id: 3,
    title: "Salary negotiation tips for new grads",
    author: "Mike Rodriguez",
    avatar: "/placeholder.svg?height=32&width=32",
    replies: 41,
    likes: 78,
    tags: ["Salary", "Negotiation", "Career"],
    timeAgo: "1 day ago",
    preview: "Just got my first job offer! Any tips on how to negotiate salary as a new graduate?",
  },
]

const events = [
  {
    id: 1,
    title: "Mock Interview Practice Session",
    date: "Tomorrow, 7:00 PM",
    attendees: 24,
    type: "Virtual",
    description: "Practice technical interviews with peers",
  },
  {
    id: 2,
    title: "System Design Workshop",
    date: "Friday, 6:00 PM",
    attendees: 45,
    type: "Virtual",
    description: "Learn to design scalable systems",
  },
  {
    id: 3,
    title: "Career Fair Networking",
    date: "Next Monday, 2:00 PM",
    attendees: 120,
    type: "In-person",
    description: "Connect with recruiters from top companies",
  },
]

const leaderboard = [
  { name: "Alex Chen", points: 2847, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Sarah Johnson", points: 2756, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Mike Rodriguez", points: 2634, avatar: "/placeholder.svg?height=32&width=32" },
]

export default function CommunityPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4">
            <SidebarTrigger className="text-white" />
            <div className="flex items-center gap-2 px-4">
              <h1 className="text-xl font-semibold text-white">Community</h1>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-6">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Join the Community</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Connect with fellow job seekers, share experiences, and learn from each other
              </p>
            </div>

            {/* Community Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">12.5K</div>
                  <div className="text-sm text-gray-400">Active Members</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">3.2K</div>
                  <div className="text-sm text-gray-400">Discussions</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">48</div>
                  <div className="text-sm text-gray-400">Events This Month</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">89%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="discussions" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
                <TabsTrigger value="discussions" className="text-gray-300 data-[state=active]:text-white">
                  Discussions
                </TabsTrigger>
                <TabsTrigger value="events" className="text-gray-300 data-[state=active]:text-white">
                  Events
                </TabsTrigger>
                <TabsTrigger value="leaderboard" className="text-gray-300 data-[state=active]:text-white">
                  Leaderboard
                </TabsTrigger>
              </TabsList>

              <TabsContent value="discussions" className="space-y-6">
                {/* Search and Create */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search discussions..."
                          className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                        />
                      </div>
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        <Plus className="w-4 h-4 mr-2" />
                        New Discussion
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Discussions List */}
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <Card
                      key={discussion.id}
                      className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-colors"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={discussion.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {discussion.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-white hover:text-purple-400 cursor-pointer">
                                {discussion.title}
                              </h3>
                            </div>
                            <p className="text-gray-400 text-sm mb-3">{discussion.preview}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span>by {discussion.author}</span>
                                <span>{discussion.timeAgo}</span>
                                <div className="flex items-center space-x-1">
                                  <Reply className="w-4 h-4" />
                                  <span>{discussion.replies}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Heart className="w-4 h-4" />
                                  <span>{discussion.likes}</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {discussion.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="border-slate-600 text-gray-300 text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <Card key={event.id} className="bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-white">{event.title}</CardTitle>
                        <CardDescription className="text-gray-400">{event.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-purple-400" />
                            <span className="text-gray-300">{event.date}</span>
                          </div>
                          <Badge variant="outline" className="border-slate-600 text-gray-300">
                            {event.type}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees} attending</span>
                          </div>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            Join Event
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="leaderboard" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Top Contributors</CardTitle>
                    <CardDescription className="text-gray-400">
                      Community members who help others the most
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaderboard.map((user, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="text-lg font-bold text-gray-400">#{index + 1}</div>
                            <Avatar className="w-10 h-10">
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
                              <p className="text-sm text-gray-400">Community Helper</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-white">{user.points.toLocaleString()}</div>
                            <div className="text-sm text-gray-400">points</div>
                          </div>
                        </div>
                      ))}
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
