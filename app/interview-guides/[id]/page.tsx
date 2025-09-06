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
  "3": {
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
    content: {
      overview:
        "Behavioral interviews assess your soft skills, leadership potential, and cultural fit. This guide teaches you to craft compelling stories using the STAR method and handle any behavioral question with confidence.",
      sections: [
        {
          title: "Understanding Behavioral Interviews",
          content: [
            "Behavioral interviews are based on the premise that past behavior predicts future performance",
            "Interviewers ask about specific situations to understand how you handle challenges, work with teams, and solve problems",
            "Questions typically start with 'Tell me about a time when...' or 'Give me an example of...'",
            "The goal is to assess your soft skills, leadership potential, and cultural fit with the company",
          ],
        },
        {
          title: "The STAR Method",
          content: [
            "Situation: Set the context and background for your story",
            "Task: Describe your responsibility or the challenge you faced",
            "Action: Explain the specific steps you took to address the situation",
            "Result: Share the outcomes and what you learned from the experience",
            "Keep each component concise but detailed enough to paint a clear picture",
          ],
        },
        {
          title: "Common Question Categories",
          content: [
            "Leadership: Times you led a team, influenced others, or took initiative",
            "Problem-solving: Challenges you overcame and your approach to solutions",
            "Teamwork: Collaboration experiences and conflict resolution",
            "Adaptability: How you handle change and unexpected situations",
            "Failure/Learning: Mistakes you made and lessons learned",
          ],
        },
      ],
      tips: [
        "Prepare 8-10 diverse stories that can answer multiple question types",
        "Use recent examples from the last 2-3 years when possible",
        "Quantify your results with specific numbers and metrics",
        "Practice your stories out loud until they flow naturally",
        "Be honest about challenges and focus on what you learned",
        "Research the company's values and align your stories accordingly",
      ],
      practiceProblems: [
        {
          category: "Leadership & Initiative",
          problems: [
            "Tell me about a time you led a project",
            "Describe a situation where you had to influence others",
            "Give an example of when you took initiative",
            "Tell me about a time you had to make a difficult decision",
            "Describe when you had to step up as a leader",
          ],
        },
        {
          category: "Problem-Solving & Challenges",
          problems: [
            "Tell me about a challenging problem you solved",
            "Describe a time when you had to work with limited resources",
            "Give an example of when you had to learn something quickly",
            "Tell me about a time you had to handle multiple priorities",
            "Describe a situation where you had to think outside the box",
          ],
        },
        {
          category: "Teamwork & Collaboration",
          problems: [
            "Tell me about a time you worked with a difficult team member",
            "Describe a successful team project you were part of",
            "Give an example of when you had to resolve a conflict",
            "Tell me about a time you had to give constructive feedback",
            "Describe when you had to work with people from different backgrounds",
          ],
        },
        {
          category: "Failure & Learning",
          problems: [
            "Tell me about a time you failed at something",
            "Describe a mistake you made and how you handled it",
            "Give an example of when you received negative feedback",
            "Tell me about a time you disagreed with your manager",
            "Describe a situation where you had to admit you were wrong",
          ],
        },
      ],
      studyPlan: [
        {
          week: 1,
          focus: "Story Collection & STAR Framework",
          hours: "8-10 hours",
          goals: ["Identify 10-12 key experiences", "Learn STAR method", "Draft initial stories"],
        },
        {
          week: 2,
          focus: "Story Development & Practice",
          hours: "10-12 hours",
          goals: ["Refine stories using STAR", "Practice delivery", "Get feedback from peers"],
        },
        {
          week: 3,
          focus: "Company Research & Customization",
          hours: "6-8 hours",
          goals: [
            "Research target companies",
            "Align stories with company values",
            "Prepare company-specific examples",
          ],
        },
      ],
    },
  },
  "4": {
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
    content: {
      overview:
        "Frontend interviews test your knowledge of web technologies, frameworks, and user experience principles. This guide covers everything from JavaScript fundamentals to React patterns and performance optimization.",
      sections: [
        {
          title: "JavaScript Fundamentals",
          content: [
            "Master ES6+ features: arrow functions, destructuring, promises, async/await",
            "Understand closures, hoisting, and the event loop",
            "Know different ways to create objects and handle 'this' binding",
            "Understand prototypal inheritance and class syntax",
            "Master array and object manipulation methods",
          ],
        },
        {
          title: "React & Component Architecture",
          content: [
            "Understand component lifecycle and hooks (useState, useEffect, useContext)",
            "Master state management patterns and when to lift state up",
            "Know how to optimize performance with React.memo, useMemo, useCallback",
            "Understand controlled vs uncontrolled components",
            "Learn about React patterns: render props, higher-order components, custom hooks",
          ],
        },
        {
          title: "CSS & Styling",
          content: [
            "Master Flexbox and CSS Grid for layout",
            "Understand CSS specificity and the cascade",
            "Know responsive design principles and media queries",
            "Understand CSS-in-JS solutions and their trade-offs",
            "Learn about CSS animations and transitions",
          ],
        },
      ],
      tips: [
        "Practice coding challenges on a whiteboard or in a simple text editor",
        "Be prepared to explain your code and discuss alternative approaches",
        "Know the trade-offs of different solutions and when to use each",
        "Practice building small applications from scratch",
        "Stay updated with the latest frontend trends and best practices",
        "Understand browser APIs and how they work",
      ],
      practiceProblems: [
        {
          category: "JavaScript Coding",
          problems: [
            "Implement debounce and throttle functions",
            "Create a deep clone function",
            "Build a simple event emitter",
            "Implement array methods (map, filter, reduce) from scratch",
            "Create a function to flatten nested arrays",
          ],
        },
        {
          category: "React Components",
          problems: [
            "Build a todo list with add/edit/delete functionality",
            "Create a reusable modal component",
            "Implement an infinite scroll component",
            "Build a form with validation",
            "Create a data table with sorting and filtering",
          ],
        },
        {
          category: "CSS Challenges",
          problems: [
            "Create a responsive navigation menu",
            "Build a card layout with CSS Grid",
            "Implement a loading spinner animation",
            "Create a tooltip component with pure CSS",
            "Build a responsive image gallery",
          ],
        },
      ],
      studyPlan: [
        {
          week: 1,
          focus: "JavaScript Fundamentals",
          hours: "12-15 hours",
          goals: ["Master ES6+ features", "Understand closures and scope", "Practice coding challenges"],
        },
        {
          week: 2,
          focus: "React & State Management",
          hours: "15-18 hours",
          goals: ["Master React hooks", "Build complex components", "Learn state management patterns"],
        },
        {
          week: 3,
          focus: "CSS & Performance",
          hours: "10-12 hours",
          goals: ["Master modern CSS", "Learn performance optimization", "Practice responsive design"],
        },
      ],
    },
  },
  "5": {
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
    content: {
      overview:
        "Backend interviews focus on server-side technologies, system architecture, and scalability. This guide covers API design, database optimization, caching strategies, and distributed system concepts.",
      sections: [
        {
          title: "API Design & Development",
          content: [
            "Understand REST principles and when to use different HTTP methods",
            "Learn GraphQL concepts and when it's better than REST",
            "Master API versioning strategies and backward compatibility",
            "Understand authentication and authorization (JWT, OAuth, API keys)",
            "Learn about rate limiting, pagination, and error handling",
          ],
        },
        {
          title: "Database Design & Optimization",
          content: [
            "Master SQL queries, joins, and query optimization",
            "Understand database indexing and when to use different index types",
            "Learn about ACID properties and transaction management",
            "Understand NoSQL databases and when to choose them over SQL",
            "Master database scaling techniques: sharding, replication, partitioning",
          ],
        },
        {
          title: "Caching & Performance",
          content: [
            "Understand different caching strategies: cache-aside, write-through, write-behind",
            "Learn about Redis and Memcached use cases",
            "Master CDN concepts and edge caching",
            "Understand cache invalidation strategies and cache coherence",
            "Learn about application-level caching and memoization",
          ],
        },
      ],
      tips: [
        "Practice designing APIs for real-world scenarios",
        "Understand the trade-offs between different database choices",
        "Learn to identify bottlenecks and propose solutions",
        "Practice explaining complex concepts in simple terms",
        "Stay updated with cloud services and their use cases",
        "Understand monitoring and logging best practices",
      ],
      practiceProblems: [
        {
          category: "API Design",
          problems: [
            "Design a RESTful API for a social media platform",
            "Create an API for a e-commerce system",
            "Design a real-time chat API",
            "Build an API for a file storage service",
            "Design a notification system API",
          ],
        },
        {
          category: "Database Design",
          problems: [
            "Design a database schema for a booking system",
            "Optimize slow queries in a large dataset",
            "Design a database for a multi-tenant application",
            "Create a schema for a content management system",
            "Design a database for analytics and reporting",
          ],
        },
        {
          category: "System Architecture",
          problems: [
            "Design a caching layer for a high-traffic application",
            "Architect a microservices-based system",
            "Design a message queue system",
            "Create a distributed logging system",
            "Design a real-time analytics pipeline",
          ],
        },
      ],
      studyPlan: [
        {
          week: 1,
          focus: "API Design & HTTP",
          hours: "15-18 hours",
          goals: ["Master REST principles", "Learn GraphQL basics", "Practice API design"],
        },
        {
          week: 2,
          focus: "Database Systems",
          hours: "18-20 hours",
          goals: ["Master SQL optimization", "Learn NoSQL concepts", "Practice schema design"],
        },
        {
          week: 3,
          focus: "Distributed Systems",
          hours: "20-22 hours",
          goals: ["Learn caching strategies", "Understand microservices", "Practice system design"],
        },
      ],
    },
  },
  "6": {
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
    content: {
      overview:
        "Product Manager interviews assess your strategic thinking, analytical skills, and ability to drive product decisions. This guide covers product strategy, user research, metrics analysis, and stakeholder management.",
      sections: [
        {
          title: "Product Strategy & Vision",
          content: [
            "Learn to define product vision and align it with business objectives",
            "Understand how to prioritize features using frameworks like RICE, MoSCoW",
            "Master product roadmap creation and communication",
            "Learn to identify market opportunities and competitive advantages",
            "Understand how to balance user needs with business constraints",
          ],
        },
        {
          title: "User Research & Data Analysis",
          content: [
            "Master user interview techniques and survey design",
            "Learn to create and analyze user personas and journey maps",
            "Understand A/B testing principles and statistical significance",
            "Learn to define and track key product metrics (KPIs)",
            "Master data-driven decision making and hypothesis testing",
          ],
        },
        {
          title: "Stakeholder Management",
          content: [
            "Learn to communicate with engineering, design, and business teams",
            "Master the art of saying 'no' and managing expectations",
            "Understand how to influence without authority",
            "Learn to present to executives and get buy-in for initiatives",
            "Master conflict resolution and consensus building",
          ],
        },
      ],
      tips: [
        "Practice product case studies and estimation questions",
        "Stay updated with industry trends and competitor analysis",
        "Learn to think like a user while considering business impact",
        "Practice explaining complex concepts to different audiences",
        "Develop strong analytical and problem-solving skills",
        "Build a portfolio of product decisions and their outcomes",
      ],
      practiceProblems: [
        {
          category: "Product Strategy",
          problems: [
            "How would you improve Instagram Stories?",
            "Design a product for elderly users to stay connected",
            "Should Google build a social media platform?",
            "How would you monetize a free meditation app?",
            "Design a feature to reduce food waste",
          ],
        },
        {
          category: "Metrics & Analysis",
          problems: [
            "How would you measure the success of YouTube Shorts?",
            "What metrics would you track for a ride-sharing app?",
            "How would you analyze a 20% drop in user engagement?",
            "Design an experiment to test a new checkout flow",
            "How would you measure product-market fit?",
          ],
        },
        {
          category: "Market Sizing",
          problems: [
            "Estimate the market size for electric scooters in NYC",
            "How many pizza slices are sold in the US daily?",
            "Estimate the revenue potential of a B2B SaaS tool",
            "How many dog walkers are there in San Francisco?",
            "Estimate the market for online grocery delivery",
          ],
        },
      ],
      studyPlan: [
        {
          week: 1,
          focus: "Product Fundamentals",
          hours: "10-12 hours",
          goals: ["Learn product frameworks", "Practice case studies", "Study successful products"],
        },
        {
          week: 2,
          focus: "Analytics & Metrics",
          hours: "8-10 hours",
          goals: ["Master key metrics", "Learn A/B testing", "Practice data analysis"],
        },
        {
          week: 3,
          focus: "Strategy & Communication",
          hours: "6-8 hours",
          goals: ["Practice presentations", "Learn stakeholder management", "Mock interviews"],
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
