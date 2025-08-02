"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, CheckCircle, Play, Trophy, Target } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

// Add state for filters
const ProblemsPage = () => {
  const [problems, setProblems] = useState([])
  const [filteredProblems, setFilteredProblems] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Fetch problems on component mount
  useEffect(() => {
    fetchProblems()
  }, [])

  // Filter problems when filters change
  useEffect(() => {
    filterProblems()
  }, [problems, searchQuery, difficultyFilter, categoryFilter, statusFilter])

  const fetchProblems = async () => {
    try {
      const response = await fetch("/api/problems")
      const data = await response.json()
      setProblems(data.problems)
      setFilteredProblems(data.problems)
    } catch (error) {
      console.error("Failed to fetch problems:", error)
    }
  }

  const filterProblems = () => {
    let filtered = problems

    if (searchQuery) {
      filtered = filtered.filter(
        (problem) =>
          problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          problem.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (difficultyFilter !== "all") {
      filtered = filtered.filter((problem) => problem.difficulty.toLowerCase() === difficultyFilter.toLowerCase())
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((problem) => problem.category.toLowerCase() === categoryFilter.toLowerCase())
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((problem) => {
        if (statusFilter === "solved") {
          return problem.solved === true
        } else if (statusFilter === "attempted") {
          return problem.attempts > 0 && !problem.solved
        } else if (statusFilter === "todo") {
          return problem.attempts === 0
        }
        return true
      })
    }

    setFilteredProblems(filtered)
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4">
            <SidebarTrigger className="text-white" />
            <div className="flex items-center gap-2 px-4">
              <h1 className="text-xl font-semibold text-white">Coding Problems</h1>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">127</div>
                  <div className="text-sm text-gray-400">Problems Solved</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">#1,247</div>
                  <div className="text-sm text-gray-400">Global Rank</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">5:42</div>
                  <div className="text-sm text-gray-400">Avg Solve Time</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">28</div>
                  <div className="text-sm text-gray-400">Day Streak</div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Find Problems</CardTitle>
                <CardDescription className="text-gray-400">
                  Search and filter coding problems by difficulty, category, and tags
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search problems..."
                      className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                    <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="array">Array</SelectItem>
                      <SelectItem value="string">String</SelectItem>
                      <SelectItem value="linked-list">Linked List</SelectItem>
                      <SelectItem value="tree">Tree</SelectItem>
                      <SelectItem value="graph">Graph</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="all">All Problems</SelectItem>
                      <SelectItem value="solved">Solved</SelectItem>
                      <SelectItem value="attempted">Attempted</SelectItem>
                      <SelectItem value="todo">To Do</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Problems List */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Problems ({filteredProblems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredProblems.map((problem) => (
                    <div
                      key={problem.id}
                      className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex items-center justify-center w-8 h-8">
                          {problem.solved ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : problem.attempts > 0 ? (
                            <div className="w-6 h-6 border-2 border-yellow-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            </div>
                          ) : (
                            <div className="w-6 h-6 border-2 border-gray-500 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <span className="text-gray-400 text-sm">#{problem.id}</span>
                            <h3 className="text-white font-medium">{problem.title}</h3>
                            <Badge
                              variant="secondary"
                              className={`text-xs ${
                                problem.difficulty === "Easy"
                                  ? "bg-green-500/20 text-green-400"
                                  : problem.difficulty === "Medium"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {problem.difficulty}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>Acceptance: {problem.acceptance}</span>
                            <span>Category: {problem.category}</span>
                            {problem.bestTime && <span>Best: {problem.bestTime}</span>}
                            {problem.attempts > 0 && <span>Attempts: {problem.attempts}</span>}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {problem.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="border-slate-600 text-gray-400 text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right text-sm text-gray-400 mr-4">
                          <div>{problem.timeLimit}</div>
                          <div>{problem.memoryLimit}</div>
                        </div>
                        <Link href={`/problems/${problem.id}`}>
                          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                            <Play className="w-4 h-4 mr-2" />
                            Solve
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export default ProblemsPage
