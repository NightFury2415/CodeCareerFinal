import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Clock,
  Users,
  Star,
  ArrowLeft,
  CheckCircle,
  Target,
  Brain,
  Code,
  MessageSquare,
  Lightbulb,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const guides = {
  "1": {
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
    content: {
      overview:
        "This comprehensive guide covers everything you need to know about technical interviews, from basic data structures to advanced problem-solving techniques.",
      sections: [
        {
          title: "Understanding Technical Interviews",
          content: [
            "Technical interviews are designed to assess your problem-solving skills, coding ability, and understanding of computer science fundamentals.",
            "Most technical interviews follow a similar structure: problem introduction, clarification questions, solution approach, coding, and optimization.",
            "The interviewer is not just looking for the correct answer, but also your thought process and communication skills.",
          ],
        },
        {
          title: "Essential Data Structures",
          content: [
            "Arrays and Strings: Master basic operations, two-pointer techniques, and sliding window problems",
            "Linked Lists: Understand traversal, insertion, deletion, and common patterns like fast/slow pointers",
            "Stacks and Queues: Learn when to use each and practice problems involving parentheses, monotonic stacks",
            "Trees and Graphs: Master tree traversals (DFS, BFS) and basic graph algorithms",
            "Hash Tables: Understand time complexity and use cases for fast lookups",
          ],
        },
        {
          title: "Algorithm Patterns",
          content: [
            "Two Pointers: Use for array problems, palindromes, and finding pairs",
            "Sliding Window: Perfect for substring problems and array subarrays",
            "Binary Search: Master the template and variations (find target, first/last occurrence)",
            "Dynamic Programming: Start with 1D DP, then move to 2D problems",
            "Backtracking: Understand the template for permutations, combinations, and constraint problems",
          ],
        },
      ],
      tips: [
        "Always clarify the problem before starting to code",
        "Think out loud and explain your approach",
        "Start with a brute force solution, then optimize",
        "Test your code with examples",
        "Discuss time and space complexity",
        "Ask questions about edge cases",
      ],
      practiceProblems: [
        {
          category: "Arrays & Strings",
          problems: [
            "Two Sum (LeetCode 1)",
            "Valid Anagram (LeetCode 242)",
            "Group Anagrams (LeetCode 49)",
            "Longest Substring Without Repeating Characters (LeetCode 3)",
            "Container With Most Water (LeetCode 11)",
          ],
        },
        {
          category: "Linked Lists",
          problems: [
            "Reverse Linked List (LeetCode 206)",
            "Merge Two Sorted Lists (LeetCode 21)",
            "Linked List Cycle (LeetCode 141)",
            "Remove Nth Node From End (LeetCode 19)",
            "Intersection of Two Linked Lists (LeetCode 160)",
          ],
        },
        {
          category: "Trees & Graphs",
          problems: [
            "Maximum Depth of Binary Tree (LeetCode 104)",
            "Same Tree (LeetCode 100)",
            "Invert Binary Tree (LeetCode 226)",
            "Binary Tree Level Order Traversal (LeetCode 102)",
            "Number of Islands (LeetCode 200)",
          ],
        },
        {
          category: "Dynamic Programming",
          problems: [
            "Climbing Stairs (LeetCode 70)",
            "House Robber (LeetCode 198)",
            "Coin Change (LeetCode 322)",
            "Longest Increasing Subsequence (LeetCode 300)",
            "Edit Distance (LeetCode 72)",
          ],
        },
      ],
      studyPlan: [
        {
          week: 1,
          focus: "Arrays and Strings",
          hours: "10-12 hours",
          goals: ["Master two-pointer technique", "Solve 15 array problems", "Understand string manipulation"],
        },
        {
          week: 2,
          focus: "Linked Lists and Stacks",
          hours: "8-10 hours",
          goals: ["Implement linked list operations", "Solve 10 linked list problems", "Master stack applications"],
        },
        {
          week: 3,
          focus: "Trees and Binary Search",
          hours: "12-15 hours",
          goals: ["Master tree traversals", "Solve 12 tree problems", "Implement binary search variations"],
        },
        {
          week: 4,
          focus: "Dynamic Programming Basics",
          hours: "15-18 hours",
          goals: ["Understand DP concepts", "Solve 10 DP problems", "Master 1D DP patterns"],
        },
      ],
    },
  },
  "2": {
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
    content: {
      overview:
        "System design interviews test your ability to architect large-scale distributed systems. This guide covers fundamental concepts and provides frameworks for approaching system design problems.",
      sections: [
        {
          title: "System Design Fundamentals",
          content: [
            "Scalability: Understand horizontal vs vertical scaling, and when to use each approach",
            "Reliability: Design systems that continue to work correctly even when failures occur",
            "Availability: Ensure your system remains operational over time",
            "Consistency: Understand CAP theorem and different consistency models",
            "Partition Tolerance: Design systems that continue to operate despite network failures",
          ],
        },
        {
          title: "Core Components",
          content: [
            "Load Balancers: Distribute incoming requests across multiple servers",
            "Databases: Choose between SQL and NoSQL based on requirements",
            "Caching: Implement caching strategies at different levels (browser, CDN, application, database)",
            "Message Queues: Handle asynchronous processing and decouple system components",
            "CDN: Deliver content efficiently to users worldwide",
          ],
        },
        {
          title: "Design Process",
          content: [
            "1. Clarify requirements and constraints",
            "2. Estimate scale (users, data, requests per second)",
            "3. Design high-level architecture",
            "4. Design core components in detail",
            "5. Scale the design",
            "6. Address bottlenecks and single points of failure",
          ],
        },
      ],
      tips: [
        "Start with simple design, then add complexity",
        "Always ask clarifying questions about requirements",
        "Estimate numbers (users, data size, QPS)",
        "Draw diagrams to visualize your design",
        "Discuss trade-offs for each design decision",
        "Consider failure scenarios and how to handle them",
      ],
      practiceProblems: [
        {
          category: "Social Media Systems",
          problems: [
            "Design Twitter",
            "Design Instagram",
            "Design Facebook News Feed",
            "Design WhatsApp",
            "Design TikTok",
          ],
        },
        {
          category: "E-commerce & Marketplace",
          problems: [
            "Design Amazon",
            "Design Uber",
            "Design Airbnb",
            "Design Food Delivery System",
            "Design Payment System",
          ],
        },
        {
          category: "Infrastructure Systems",
          problems: [
            "Design URL Shortener (Bit.ly)",
            "Design Web Crawler",
            "Design Search Engine",
            "Design Chat System",
            "Design Notification System",
          ],
        },
        {
          category: "Streaming & Media",
          problems: [
            "Design YouTube",
            "Design Netflix",
            "Design Spotify",
            "Design Live Streaming Platform",
            "Design Video Conferencing System",
          ],
        },
      ],
      studyPlan: [
        {
          week: 1,
          focus: "Fundamentals & Building Blocks",
          hours: "15-20 hours",
          goals: [
            "Understand scalability concepts",
            "Learn about load balancers and databases",
            "Study caching strategies",
          ],
        },
        {
          week: 2,
          focus: "Practice Basic Designs",
          hours: "20-25 hours",
          goals: ["Design URL shortener", "Design simple chat system", "Practice estimation techniques"],
        },
        {
          week: 3,
          focus: "Complex Systems",
          hours: "25-30 hours",
          goals: ["Design social media systems", "Learn about microservices", "Study distributed databases"],
        },
        {
          week: 4,
          focus: "Advanced Topics & Mock Interviews",
          hours: "20-25 hours",
          goals: ["Practice with peers", "Study real system architectures", "Refine presentation skills"],
        },
      ],
    },
  },
}

export default function InterviewGuidePage({ params }: { params: { id: string } }) {
  const guide = guides[params.id]

  if (!guide) {
    notFound()
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4">
            <SidebarTrigger className="text-white" />
            <div className="flex items-center gap-2 px-4">
              <Link href="/interview-guides">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Guides
                </Button>
              </Link>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className={`w-4 h-4 bg-gradient-to-r ${guide.color} rounded-full`}></div>
                <Badge
                  variant="secondary"
                  className={`${
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
              <h1 className="text-4xl font-bold text-white">{guide.title}</h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">{guide.description}</p>

              <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {guide.duration}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {guide.students.toLocaleString()} students
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  {guide.rating}
                </div>
              </div>
            </div>

            {/* Overview */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{guide.content.overview}</p>
              </CardContent>
            </Card>

            {/* Main Content Sections */}
            {guide.content.sections.map((section, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-300 leading-relaxed flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            {/* Tips */}
            <Card className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-yellow-500/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {guide.content.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-yellow-500/10 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-200 text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Practice Problems */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-green-400" />
                  Practice Problems
                </CardTitle>
                <CardDescription className="text-gray-400">Essential problems to master for this topic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {guide.content.practiceProblems.map((category, index) => (
                    <div key={index} className="space-y-3">
                      <h4 className="font-semibold text-white text-lg">{category.category}</h4>
                      <ul className="space-y-2">
                        {category.problems.map((problem, problemIndex) => (
                          <li key={problemIndex} className="flex items-center gap-2 text-gray-300">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-sm">{problem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Study Plan */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  Recommended Study Plan
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Follow this structured approach to master the topic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {guide.content.studyPlan.map((week, index) => (
                    <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-white">
                          Week {week.week}: {week.focus}
                        </h4>
                        <Badge variant="outline" className="border-purple-500 text-purple-300">
                          {week.hours}
                        </Badge>
                      </div>
                      <ul className="space-y-1">
                        {week.goals.map((goal, goalIndex) => (
                          <li key={goalIndex} className="text-gray-300 text-sm flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Link href="/dashboard/mock-interviews">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Practice with Mock Interview
                </Button>
              </Link>
              <Link href="/dashboard/problems">
                <Button variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent">
                  <Code className="w-4 h-4 mr-2" />
                  Solve Practice Problems
                </Button>
              </Link>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
