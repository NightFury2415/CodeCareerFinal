"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Users, Trophy, BookOpen, Brain, Briefcase } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">CareerCode</span>
              </Link>

              <div className="hidden md:flex items-center space-x-6">
                <Link href="/problems" className="text-gray-300 hover:text-white transition-colors">
                  Problems
                </Link>
                <Link href="/jobs" className="text-gray-300 hover:text-white transition-colors">
                  Jobs
                </Link>
                <Link href="/dashboard/mock-interviews" className="text-gray-300 hover:text-white transition-colors">
                  Mock Interviews
                </Link>
                <Link href="/leaderboard" className="text-gray-300 hover:text-white transition-colors">
                  Leaderboard
                </Link>
                <Link href="/interview-guides" className="text-gray-300 hover:text-white transition-colors">
                  Interview Guides
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-300 hover:text-white" asChild>
                <Link href="/auth/login">Log In</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                asChild
              >
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Master Your
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Tech Career
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Practice coding problems, ace technical interviews, and land your dream job at top tech companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              asChild
            >
              <Link href="/auth/signup">
                Start Practicing <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              asChild
            >
              <Link href="/dashboard/mock-interviews">Try Mock Interview</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <Code className="w-8 h-8 text-purple-400 mb-2" />
              <CardTitle className="text-white">Coding Problems</CardTitle>
              <CardDescription className="text-gray-400">
                Practice with 1000+ problems from easy to hard difficulty
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Badge variant="secondary">Arrays</Badge>
                <Badge variant="secondary">Trees</Badge>
                <Badge variant="secondary">DP</Badge>
              </div>
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                asChild
              >
                <Link href="/problems">Start Coding</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <Brain className="w-8 h-8 text-pink-400 mb-2" />
              <CardTitle className="text-white">Mock Interviews</CardTitle>
              <CardDescription className="text-gray-400">
                AI-powered mock interviews with real-time feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Badge variant="secondary">Technical</Badge>
                <Badge variant="secondary">Behavioral</Badge>
                <Badge variant="secondary">System Design</Badge>
              </div>
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                asChild
              >
                <Link href="/dashboard/mock-interviews">Practice Interview</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <Briefcase className="w-8 h-8 text-blue-400 mb-2" />
              <CardTitle className="text-white">Job Search</CardTitle>
              <CardDescription className="text-gray-400">
                Find and apply to top tech jobs with our curated listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Badge variant="secondary">Remote</Badge>
                <Badge variant="secondary">FAANG</Badge>
                <Badge variant="secondary">Startups</Badge>
              </div>
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                asChild
              >
                <Link href="/jobs">Browse Jobs</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <Trophy className="w-8 h-8 text-yellow-400 mb-2" />
              <CardTitle className="text-white">Leaderboard</CardTitle>
              <CardDescription className="text-gray-400">Compete with others and track your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Badge variant="secondary">Weekly</Badge>
                <Badge variant="secondary">Monthly</Badge>
                <Badge variant="secondary">All Time</Badge>
              </div>
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                asChild
              >
                <Link href="/leaderboard">View Rankings</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <BookOpen className="w-8 h-8 text-green-400 mb-2" />
              <CardTitle className="text-white">Interview Guides</CardTitle>
              <CardDescription className="text-gray-400">Comprehensive guides for technical interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Badge variant="secondary">Algorithms</Badge>
                <Badge variant="secondary">System Design</Badge>
                <Badge variant="secondary">Behavioral</Badge>
              </div>
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                asChild
              >
                <Link href="/interview-guides">Read Guides</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <Users className="w-8 h-8 text-indigo-400 mb-2" />
              <CardTitle className="text-white">Community</CardTitle>
              <CardDescription className="text-gray-400">
                Connect with other developers and share experiences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Badge variant="secondary">Discussions</Badge>
                <Badge variant="secondary">Tips</Badge>
                <Badge variant="secondary">Success Stories</Badge>
              </div>
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                asChild
              >
                <Link href="/community">Join Community</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
