import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Building,
  Users,
  DollarSign,
  BookOpen,
  CheckCircle,
  Brain,
  Code,
  MessageSquare,
  Lightbulb,
  AlertTriangle,
  ArrowLeft,
  TrendingUp,
  Globe,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProblemSlugFromTitle } from "@/lib/problem-utils"

const companies = {
  google: {
    name: "Google",
    logo: "G",
    color: "from-blue-500 to-green-500",
    difficulty: "Very Hard",
    avgSalary: "$280k",
    interviewRounds: 5,
    completionRate: 78,
    employees: "156,000+",
    founded: "1998",
    headquarters: "Mountain View, CA",
    description: "Master system design, algorithms, and Googleyness",
    overview:
      "Google is known for its rigorous technical interviews and unique culture focused on innovation, data-driven decisions, and 'Googleyness' - a combination of intellectual humility, comfort with ambiguity, and evidence of taking on challenges.",
    culture: [
      "Innovation and creativity are highly valued",
      "Data-driven decision making is fundamental",
      "Collaboration across teams and projects",
      "20% time for personal projects",
      "Focus on user experience and impact",
      "Intellectual humility and continuous learning",
    ],
    interviewProcess: [
      {
        round: "Phone/Video Screen",
        duration: "45-60 minutes",
        focus: "Coding and algorithms",
        description: "Initial technical screening with coding problems, usually 1-2 medium difficulty questions",
      },
      {
        round: "Technical Interviews (4-5 rounds)",
        duration: "45 minutes each",
        focus: "Coding, algorithms, system design",
        description:
          "Mix of coding interviews and system design (for senior roles). Expect questions on data structures, algorithms, and problem-solving",
      },
      {
        round: "Googleyness & Leadership",
        duration: "30-45 minutes",
        focus: "Behavioral and culture fit",
        description: "Assessment of leadership qualities, collaboration skills, and alignment with Google's values",
      },
      {
        round: "Hiring Committee",
        duration: "N/A",
        focus: "Final decision",
        description: "Committee reviews all interview feedback and makes final hiring decision",
      },
    ],
    tips: [
      "Practice coding on a whiteboard or Google Doc",
      "Focus on clean, readable code with good variable names",
      "Explain your thought process clearly",
      "Ask clarifying questions before coding",
      "Discuss time and space complexity",
      "Show intellectual humility - admit when you don't know something",
      "Demonstrate impact and leadership in past projects",
      "Prepare for system design if applying for L5+ roles",
    ],
    practiceProblems: [
      {
        category: "Arrays & Strings",
        difficulty: "Medium-Hard",
        problems: [
          "Longest Substring Without Repeating Characters",
          "Group Anagrams",
          "Valid Parentheses",
          "Merge Intervals",
          "Spiral Matrix",
          "Rotate Image",
          "String to Integer (atoi)",
          "ZigZag Conversion",
        ],
      },
      {
        category: "Trees & Graphs",
        difficulty: "Medium-Hard",
        problems: [
          "Binary Tree Maximum Path Sum",
          "Serialize and Deserialize Binary Tree",
          "Word Ladder",
          "Number of Islands",
          "Clone Graph",
          "Course Schedule",
          "Binary Tree Level Order Traversal",
          "Validate Binary Search Tree",
        ],
      },
      {
        category: "Dynamic Programming",
        difficulty: "Hard",
        problems: [
          "Edit Distance",
          "Regular Expression Matching",
          "Longest Increasing Subsequence",
          "Maximum Subarray",
          "Coin Change",
          "Unique Paths",
          "Word Break",
          "Palindrome Partitioning",
        ],
      },
      {
        category: "System Design (L5+)",
        difficulty: "Hard",
        problems: [
          "Design Google Search",
          "Design YouTube",
          "Design Google Maps",
          "Design Gmail",
          "Design Google Drive",
          "Design Ad Serving System",
          "Design Distributed Cache",
          "Design URL Shortener",
        ],
      },
    ],
    studyPlan: [
      {
        week: 1,
        focus: "Data Structures Fundamentals",
        hours: "15-20 hours",
        goals: [
          "Master arrays, strings, and hash tables",
          "Solve 20 easy-medium problems",
          "Practice explaining solutions clearly",
          "Review time/space complexity analysis",
        ],
      },
      {
        week: 2,
        focus: "Trees and Graphs",
        hours: "18-22 hours",
        goals: [
          "Master tree traversals (DFS, BFS)",
          "Solve 15 tree and graph problems",
          "Practice recursive thinking",
          "Learn graph algorithms (DFS, BFS, Union-Find)",
        ],
      },
      {
        week: 3,
        focus: "Advanced Algorithms",
        hours: "20-25 hours",
        goals: [
          "Study dynamic programming patterns",
          "Solve 12 DP problems",
          "Practice backtracking problems",
          "Review sorting and searching algorithms",
        ],
      },
      {
        week: 4,
        focus: "System Design & Mock Interviews",
        hours: "15-20 hours",
        goals: [
          "Study system design fundamentals",
          "Practice 3-4 system design problems",
          "Do mock interviews with peers",
          "Prepare behavioral stories using STAR method",
        ],
      },
    ],
    salaryRanges: {
      "L3 (Software Engineer)": "$150k - $200k",
      "L4 (Senior Software Engineer)": "$200k - $280k",
      "L5 (Staff Software Engineer)": "$280k - $400k",
      "L6 (Senior Staff Software Engineer)": "$400k - $550k",
      "L7 (Principal Software Engineer)": "$550k - $750k+",
    },
  },
  apple: {
    name: "Apple",
    logo: "A",
    color: "from-gray-500 to-gray-700",
    difficulty: "Hard",
    avgSalary: "$260k",
    interviewRounds: 4,
    completionRate: 82,
    employees: "164,000+",
    founded: "1976",
    headquarters: "Cupertino, CA",
    description: "Focus on product thinking and technical excellence",
    overview:
      "Apple emphasizes product quality, user experience, and technical excellence. The interview process focuses on both technical skills and product thinking, with a strong emphasis on attention to detail and innovation.",
    culture: [
      "Obsession with product quality and user experience",
      "Secrecy and confidentiality are paramount",
      "Attention to detail in everything",
      "Innovation and pushing boundaries",
      "Collaboration across hardware and software teams",
      "Think different mentality",
    ],
    interviewProcess: [
      {
        round: "Phone Screen",
        duration: "30-45 minutes",
        focus: "Technical and behavioral",
        description: "Initial screening covering technical background and basic coding questions",
      },
      {
        round: "Technical Interviews (2-3 rounds)",
        duration: "60 minutes each",
        focus: "Coding and system design",
        description: "Deep technical interviews with coding problems and system design discussions",
      },
      {
        round: "Product/Team Fit",
        duration: "45 minutes",
        focus: "Product thinking and culture",
        description: "Discussion about product decisions, user experience, and team collaboration",
      },
      {
        round: "Final Round",
        duration: "30-45 minutes",
        focus: "Leadership and vision",
        description: "Senior leadership interview focusing on vision, leadership, and cultural fit",
      },
    ],
    tips: [
      "Emphasize product quality and user experience",
      "Show attention to detail in your solutions",
      "Discuss trade-offs between performance and user experience",
      "Demonstrate knowledge of Apple's products and ecosystem",
      "Show passion for technology and innovation",
      "Be prepared to discuss iOS/macOS development if relevant",
      "Maintain confidentiality about the interview process",
      "Think about how your work impacts millions of users",
    ],
    practiceProblems: [
      {
        category: "iOS/Mobile Development",
        difficulty: "Medium",
        problems: [
          "Design iOS Calculator App",
          "Implement Auto Layout Constraints",
          "Memory Management in iOS",
          "Core Data Implementation",
          "Push Notifications System",
          "Camera and Photo Library Integration",
          "Networking with URLSession",
          "Custom UI Components",
        ],
      },
      {
        category: "Algorithms & Data Structures",
        difficulty: "Medium-Hard",
        problems: [
          "LRU Cache Implementation",
          "Design File System",
          "Implement Trie (Prefix Tree)",
          "Binary Search Variations",
          "Sliding Window Maximum",
          "Design Hit Counter",
          "Implement Stack with Min Function",
          "Design Circular Queue",
        ],
      },
      {
        category: "System Design",
        difficulty: "Hard",
        problems: [
          "Design iMessage",
          "Design App Store",
          "Design iCloud Storage",
          "Design Siri Voice Assistant",
          "Design Apple Music",
          "Design Find My iPhone",
          "Design Apple Pay System",
          "Design iOS Update System",
        ],
      },
      {
        category: "Product Design",
        difficulty: "Medium",
        problems: [
          "Improve iPhone Camera App",
          "Design New Apple Watch Feature",
          "Redesign Mac Finder",
          "Create New iPad Productivity App",
          "Design Apple TV Interface",
          "Improve Siri Interactions",
          "Design AirPods Pro Features",
          "Create New Health App Feature",
        ],
      },
    ],
    studyPlan: [
      {
        week: 1,
        focus: "iOS Development Fundamentals",
        hours: "12-15 hours",
        goals: [
          "Review Swift programming language",
          "Study iOS app architecture patterns",
          "Practice UIKit and SwiftUI",
          "Understand memory management",
        ],
      },
      {
        week: 2,
        focus: "Data Structures & Algorithms",
        hours: "15-18 hours",
        goals: [
          "Solve 15 medium difficulty problems",
          "Focus on tree and graph algorithms",
          "Practice system design basics",
          "Review time complexity analysis",
        ],
      },
      {
        week: 3,
        focus: "Product Thinking & Design",
        hours: "10-12 hours",
        goals: [
          "Study Apple's design principles",
          "Practice product design questions",
          "Analyze Apple's product decisions",
          "Prepare user experience discussions",
        ],
      },
      {
        week: 4,
        focus: "Mock Interviews & Final Prep",
        hours: "12-15 hours",
        goals: [
          "Conduct mock technical interviews",
          "Practice behavioral questions",
          "Review Apple's recent products and updates",
          "Prepare questions to ask interviewers",
        ],
      },
    ],
    salaryRanges: {
      "ICT2 (Software Engineer)": "$140k - $180k",
      "ICT3 (Software Engineer II)": "$180k - $240k",
      "ICT4 (Senior Software Engineer)": "$240k - $320k",
      "ICT5 (Staff Software Engineer)": "$320k - $450k",
      "ICT6 (Principal Software Engineer)": "$450k - $600k+",
    },
  },
  microsoft: {
    name: "Microsoft",
    logo: "M",
    color: "from-blue-600 to-blue-800",
    difficulty: "Hard",
    avgSalary: "$250k",
    interviewRounds: 4,
    completionRate: 85,
    employees: "221,000+",
    founded: "1975",
    headquarters: "Redmond, WA",
    description: "Emphasizes collaboration and growth mindset",
    overview:
      "Microsoft values collaboration, growth mindset, and inclusive culture. The interview process focuses on technical skills, problem-solving ability, and cultural fit with emphasis on learning and adaptability.",
    culture: [
      "Growth mindset and continuous learning",
      "Collaboration and teamwork",
      "Inclusive and diverse workplace",
      "Customer obsession and empathy",
      "Innovation and experimentation",
      "Respect and integrity in all interactions",
    ],
    interviewProcess: [
      {
        round: "Recruiter Screen",
        duration: "30 minutes",
        focus: "Background and interest",
        description: "Initial conversation about background, interest in Microsoft, and role expectations",
      },
      {
        round: "Technical Phone Screen",
        duration: "60 minutes",
        focus: "Coding and problem solving",
        description: "Technical interview with coding problems, usually 1-2 medium difficulty questions",
      },
      {
        round: "Virtual On-site (4 rounds)",
        duration: "45-60 minutes each",
        focus: "Technical and behavioral",
        description: "Mix of coding, system design, and behavioral interviews with different team members",
      },
      {
        round: "As Appropriate (AA)",
        duration: "45-60 minutes",
        focus: "Final assessment",
        description: "Senior interviewer makes final assessment of technical skills and cultural fit",
      },
    ],
    tips: [
      "Demonstrate growth mindset and learning from failures",
      "Show collaboration and teamwork examples",
      "Emphasize customer impact and empathy",
      "Be inclusive and respectful in all interactions",
      "Show passion for Microsoft's mission and products",
      "Prepare for both technical and behavioral questions",
      "Discuss how you handle ambiguity and change",
      "Show examples of mentoring and helping others grow",
    ],
    practiceProblems: [
      {
        category: "Cloud & Distributed Systems",
        difficulty: "Hard",
        problems: [
          "Design Azure Storage System",
          "Implement Distributed Cache",
          "Design Load Balancer",
          "Build Microservices Architecture",
          "Design Message Queue System",
          "Implement Consistent Hashing",
          "Design Database Sharding",
          "Build Monitoring System",
        ],
      },
      {
        category: "Algorithms & Problem Solving",
        difficulty: "Medium-Hard",
        problems: [
          "Merge k Sorted Lists",
          "Design LRU Cache",
          "Implement Trie Data Structure",
          "Find Median from Data Stream",
          "Design Twitter Feed",
          "Implement Rate Limiter",
          "Design Search Autocomplete",
          "Build Expression Evaluator",
        ],
      },
      {
        category: "System Design",
        difficulty: "Hard",
        problems: [
          "Design Microsoft Teams",
          "Design OneDrive",
          "Design Xbox Live",
          "Design Office 365",
          "Design Azure Functions",
          "Design Outlook Email System",
          "Design LinkedIn Feed",
          "Design Skype Video Calling",
        ],
      },
      {
        category: "Data Structures & Algorithms",
        difficulty: "Medium",
        problems: [
          "Binary Tree Right Side View",
          "Word Search II",
          "Design Add and Search Words",
          "Implement Queue using Stacks",
          "Find All Anagrams in String",
          "Design Circular Deque",
          "Implement Min Stack",
          "Design Hit Counter",
        ],
      },
    ],
    studyPlan: [
      {
        week: 1,
        focus: "Fundamentals & Cloud Concepts",
        hours: "12-15 hours",
        goals: [
          "Review data structures and algorithms",
          "Study cloud computing basics",
          "Learn about distributed systems",
          "Practice 15 coding problems",
        ],
      },
      {
        week: 2,
        focus: "System Design & Architecture",
        hours: "15-18 hours",
        goals: [
          "Study system design principles",
          "Practice designing scalable systems",
          "Learn about microservices architecture",
          "Understand database design patterns",
        ],
      },
      {
        week: 3,
        focus: "Microsoft Technologies & Products",
        hours: "10-12 hours",
        goals: [
          "Study Azure services and architecture",
          "Learn about .NET and C# if relevant",
          "Understand Microsoft's product ecosystem",
          "Practice product-specific design questions",
        ],
      },
      {
        week: 4,
        focus: "Behavioral & Mock Interviews",
        hours: "12-15 hours",
        goals: [
          "Prepare STAR method stories",
          "Practice growth mindset examples",
          "Conduct mock interviews",
          "Prepare questions about Microsoft culture",
        ],
      },
    ],
    salaryRanges: {
      "59 (Software Engineer)": "$120k - $160k",
      "60 (Software Engineer II)": "$160k - $220k",
      "61 (Senior Software Engineer)": "$220k - $300k",
      "62 (Principal Software Engineer)": "$300k - $420k",
      "63 (Partner Software Engineer)": "$420k - $550k+",
    },
  },
  amazon: {
    name: "Amazon",
    logo: "A",
    color: "from-orange-500 to-yellow-500",
    difficulty: "Hard",
    avgSalary: "$240k",
    interviewRounds: 5,
    completionRate: 75,
    employees: "1,500,000+",
    founded: "1994",
    headquarters: "Seattle, WA",
    description: "Leadership principles and customer obsession",
    overview:
      "Amazon's interview process heavily emphasizes their 16 Leadership Principles. Every interview includes behavioral questions based on these principles, combined with technical assessments. The bar raiser ensures consistent hiring standards.",
    culture: [
      "Customer obsession above all else",
      "Ownership and long-term thinking",
      "Invent and simplify solutions",
      "Learn and be curious continuously",
      "Hire and develop the best talent",
      "Insist on highest standards",
    ],
    interviewProcess: [
      {
        round: "Phone Screen",
        duration: "45-60 minutes",
        focus: "Technical and LP behavioral",
        description: "Coding problems and 1-2 leadership principle questions",
      },
      {
        round: "Virtual On-site (4-5 rounds)",
        duration: "60 minutes each",
        focus: "Technical + LP behavioral",
        description: "Each round combines coding/system design with leadership principle behavioral questions",
      },
      {
        round: "Bar Raiser Round",
        duration: "60 minutes",
        focus: "Cultural fit and standards",
        description: "Senior interviewer ensures candidate meets Amazon's high standards and cultural fit",
      },
      {
        round: "Hiring Manager Round",
        duration: "45-60 minutes",
        focus: "Role fit and team dynamics",
        description: "Direct manager assesses technical fit and team collaboration",
      },
    ],
    tips: [
      "Prepare 2-3 STAR stories for each Leadership Principle",
      "Always start behavioral answers with customer impact",
      "Show ownership and long-term thinking in examples",
      "Demonstrate high standards and attention to detail",
      "Be specific with metrics and measurable outcomes",
      "Show examples of learning from failures",
      "Emphasize simplification and invention",
      "Practice coding while explaining your thought process",
    ],
    practiceProblems: [
      {
        category: "Amazon Specific Problems",
        difficulty: "Medium-Hard",
        problems: [
          "Two Sum",
          "Merge k Sorted Lists",
          "Critical Connections in a Network",
          "Number of Islands",
          "LRU Cache Implementation",
          "Design Search Autocomplete",
          "Reorder Data in Log Files",
          "Prison Cells After N Days",
        ],
      },
      {
        category: "System Design",
        difficulty: "Hard",
        problems: [
          "Design Amazon.com Product Catalog",
          "Design Amazon Prime Video",
          "Design AWS S3",
          "Design Amazon Alexa",
          "Design Amazon Warehouse System",
          "Design Amazon Recommendation Engine",
          "Design Amazon Payment System",
          "Design Amazon Delivery Tracking",
        ],
      },
      {
        category: "Data Structures & Algorithms",
        difficulty: "Medium",
        problems: [
          "Copy List with Random Pointer",
          "Word Ladder",
          "Rotting Oranges",
          "K Closest Points to Origin",
          "Top K Frequent Elements",
          "Meeting Rooms II",
          "Analyze User Website Visit Pattern",
          "Minimum Cost to Connect Sticks",
        ],
      },
      {
        category: "Leadership Principles Scenarios",
        difficulty: "Behavioral",
        problems: [
          "Customer Obsession: Prioritizing customer needs over internal metrics",
          "Ownership: Taking responsibility for long-term outcomes",
          "Invent and Simplify: Creating innovative solutions to complex problems",
          "Learn and Be Curious: Continuously improving skills and knowledge",
          "Hire and Develop: Building and mentoring strong teams",
          "Insist on Highest Standards: Maintaining quality despite pressure",
        ],
      },
    ],
    studyPlan: [
      {
        week: 1,
        focus: "Leadership Principles & Behavioral Prep",
        hours: "15-20 hours",
        goals: [
          "Study all 16 Leadership Principles deeply",
          "Prepare 2-3 STAR stories for each principle",
          "Practice behavioral interview questions",
          "Focus on customer obsession examples",
        ],
      },
      {
        week: 2,
        focus: "Technical Fundamentals",
        hours: "18-22 hours",
        goals: [
          "Solve 20 medium difficulty problems",
          "Focus on Amazon-tagged LeetCode problems",
          "Practice explaining solutions clearly",
          "Review data structures and algorithms",
        ],
      },
      {
        week: 3,
        focus: "System Design & AWS",
        hours: "15-18 hours",
        goals: [
          "Study system design fundamentals",
          "Learn about AWS services and architecture",
          "Practice designing Amazon-scale systems",
          "Understand distributed systems concepts",
        ],
      },
      {
        week: 4,
        focus: "Mock Interviews & Final Prep",
        hours: "12-15 hours",
        goals: [
          "Conduct full mock interviews",
          "Practice combining technical and behavioral",
          "Refine STAR stories with metrics",
          "Prepare questions about Amazon culture",
        ],
      },
    ],
    salaryRanges: {
      "SDE I": "$130k - $170k",
      "SDE II": "$170k - $240k",
      "SDE III (Senior)": "$240k - $350k",
      "Principal SDE": "$350k - $500k",
      "Senior Principal SDE": "$500k - $700k+",
    },
  },
  meta: {
    name: "Meta",
    logo: "M",
    color: "from-blue-500 to-purple-600",
    difficulty: "Very Hard",
    avgSalary: "$270k",
    interviewRounds: 5,
    completionRate: 72,
    employees: "87,000+",
    founded: "2004",
    headquarters: "Menlo Park, CA",
    description: "Building for the next billion users",
    overview:
      "Meta focuses on connecting people globally through social platforms and emerging technologies like VR/AR. The interview process emphasizes technical excellence, product thinking, and ability to work at massive scale.",
    culture: [
      "Move fast and break things (now: Move fast with stable infrastructure)",
      "Be bold and take risks",
      "Focus on impact and results",
      "Be open and transparent",
      "Build social value and connect people",
      "Meta, metamates, me (company, team, self)",
    ],
    interviewProcess: [
      {
        round: "Recruiter Screen",
        duration: "30 minutes",
        focus: "Background and motivation",
        description: "Discussion about background, interest in Meta, and role expectations",
      },
      {
        round: "Technical Phone Screen",
        duration: "45 minutes",
        focus: "Coding interview",
        description: "1-2 coding problems, usually medium difficulty with focus on problem-solving approach",
      },
      {
        round: "Virtual On-site (4 rounds)",
        duration: "45 minutes each",
        focus: "Coding, system design, behavioral",
        description: "2 coding rounds, 1 system design, 1 behavioral focusing on Meta's values",
      },
      {
        round: "Final Review",
        duration: "N/A",
        focus: "Hiring decision",
        description: "Committee reviews all feedback and makes final hiring decision",
      },
    ],
    tips: [
      "Emphasize impact and scale in your examples",
      "Show ability to move fast and iterate quickly",
      "Demonstrate product thinking and user empathy",
      "Be prepared for high-scale system design questions",
      "Show examples of taking bold risks and learning from failures",
      "Discuss how you've built connections and collaborated",
      "Prepare for questions about Meta's products and mission",
      "Show passion for emerging technologies like VR/AR",
    ],
    practiceProblems: [
      {
        category: "Meta Tagged Problems",
        difficulty: "Hard",
        problems: [
          "Valid Palindrome II",
          "Binary Tree Vertical Order Traversal",
          "Remove Invalid Parentheses",
          "Subarray Sum Equals K",
          "Exclusive Time of Functions",
          "Random Pick with Weight",
          "Minimum Remove to Make Valid Parentheses",
          "Accounts Merge",
        ],
      },
      {
        category: "System Design",
        difficulty: "Very Hard",
        problems: [
          "Design Facebook News Feed",
          "Design Instagram",
          "Design WhatsApp",
          "Design Facebook Messenger",
          "Design Facebook Live",
          "Design Instagram Stories",
          "Design Facebook Groups",
          "Design Meta's Ad System",
        ],
      },
      {
        category: "Graph & Tree Problems",
        difficulty: "Hard",
        problems: [
          "Clone Graph",
          "Word Ladder II",
          "Alien Dictionary",
          "Binary Tree Maximum Path Sum",
          "Serialize and Deserialize Binary Tree",
          "Lowest Common Ancestor of Binary Tree",
          "Binary Tree Right Side View",
          "Construct Binary Tree from Preorder and Inorder",
        ],
      },
      {
        category: "Product & Behavioral",
        difficulty: "Medium",
        problems: [
          "How would you improve Facebook's user engagement?",
          "Design a feature to reduce misinformation",
          "How to handle content moderation at scale?",
          "Improve Instagram's discovery algorithm",
          "Design features for emerging markets",
          "Handle privacy concerns in social media",
        ],
      },
    ],
    studyPlan: [
      {
        week: 1,
        focus: "Advanced Data Structures",
        hours: "18-22 hours",
        goals: [
          "Master graph algorithms (DFS, BFS, Union-Find)",
          "Practice tree problems extensively",
          "Solve 15 hard difficulty problems",
          "Focus on Meta-tagged LeetCode problems",
        ],
      },
      {
        week: 2,
        focus: "System Design at Scale",
        hours: "20-25 hours",
        goals: [
          "Study large-scale system design",
          "Practice designing social media systems",
          "Learn about distributed databases",
          "Understand caching and CDN strategies",
        ],
      },
      {
        week: 3,
        focus: "Product Thinking & Meta Culture",
        hours: "12-15 hours",
        goals: [
          "Study Meta's products and recent updates",
          "Practice product design questions",
          "Understand Meta's mission and values",
          "Prepare behavioral stories showing impact",
        ],
      },
      {
        week: 4,
        focus: "Mock Interviews & Advanced Topics",
        hours: "15-20 hours",
        goals: [
          "Conduct intensive mock interviews",
          "Practice coding under pressure",
          "Review emerging technologies (VR/AR, AI)",
          "Prepare for rapid-fire technical questions",
        ],
      },
    ],
    salaryRanges: {
      "E3 (Software Engineer)": "$150k - $200k",
      "E4 (Software Engineer)": "$200k - $280k",
      "E5 (Senior Software Engineer)": "$280k - $400k",
      "E6 (Staff Software Engineer)": "$400k - $550k",
      "E7 (Senior Staff Software Engineer)": "$550k - $750k+",
    },
  },
  netflix: {
    name: "Netflix",
    logo: "N",
    color: "from-red-600 to-red-800",
    difficulty: "Very Hard",
    avgSalary: "$350k",
    interviewRounds: 6,
    completionRate: 68,
    employees: "12,800+",
    founded: "1997",
    headquarters: "Los Gatos, CA",
    description: "High performance culture and freedom",
    overview:
      "Netflix is known for its unique culture of 'Freedom and Responsibility' with extremely high performance standards. The interview process is rigorous and focuses on finding exceptional talent who can thrive in a high-performance environment.",
    culture: [
      "Freedom and responsibility",
      "High performance culture",
      "Keeper test - only A-players",
      "Context, not control",
      "Highly aligned, loosely coupled",
      "Pay top of market",
    ],
    interviewProcess: [
      {
        round: "Recruiter Screen",
        duration: "30 minutes",
        focus: "Culture and background",
        description: "Discussion about Netflix culture, background, and mutual fit assessment",
      },
      {
        round: "Hiring Manager Screen",
        duration: "60 minutes",
        focus: "Technical and cultural fit",
        description: "Deep dive into technical background and alignment with Netflix values",
      },
      {
        round: "Technical Interviews (3-4 rounds)",
        duration: "60-90 minutes each",
        focus: "Coding, system design, architecture",
        description: "Intensive technical interviews covering algorithms, system design, and architecture",
      },
      {
        round: "Values Interview",
        duration: "45-60 minutes",
        focus: "Cultural alignment",
        description: "Deep assessment of alignment with Netflix's unique culture and values",
      },
      {
        round: "Final Round",
        duration: "45 minutes",
        focus: "Executive assessment",
        description: "Senior leadership interview for final culture and performance assessment",
      },
    ],
    tips: [
      "Demonstrate exceptional performance and results",
      "Show examples of taking ownership and responsibility",
      "Be prepared for very challenging technical questions",
      "Emphasize innovation and creative problem-solving",
      "Show ability to work independently with minimal guidance",
      "Demonstrate high standards and attention to quality",
      "Be honest about failures and what you learned",
      "Show passion for entertainment and streaming technology",
    ],
    practiceProblems: [
      {
        category: "Streaming & Media Systems",
        difficulty: "Very Hard",
        problems: [
          "Design Netflix Video Streaming",
          "Design Content Recommendation Engine",
          "Design Video Encoding Pipeline",
          "Design Global CDN for Video",
          "Design A/B Testing Platform",
          "Design Real-time Analytics System",
          "Design Content Metadata System",
          "Design Subtitle and Localization System",
        ],
      },
      {
        category: "High-Scale Algorithms",
        difficulty: "Hard",
        problems: [
          "Design Consistent Hashing",
          "Implement Distributed Cache",
          "Design Rate Limiting System",
          "Build Real-time Recommendation",
          "Design Data Pipeline",
          "Implement Circuit Breaker",
          "Design Monitoring System",
          "Build Feature Flag System",
        ],
      },
      {
        category: "Data & Analytics",
        difficulty: "Hard",
        problems: [
          "Design Data Warehouse",
          "Build Real-time Stream Processing",
          "Design Machine Learning Pipeline",
          "Implement Recommendation Algorithm",
          "Design A/B Testing Framework",
          "Build Analytics Dashboard",
          "Design Data Lake Architecture",
          "Implement ETL Pipeline",
        ],
      },
      {
        category: "Performance & Optimization",
        difficulty: "Very Hard",
        problems: [
          "Optimize Video Streaming Quality",
          "Design Auto-scaling System",
          "Implement Caching Strategy",
          "Optimize Database Performance",
          "Design Load Testing Framework",
          "Build Performance Monitoring",
          "Optimize Network Protocols",
          "Design Disaster Recovery",
        ],
      },
    ],
    studyPlan: [
      {
        week: 1,
        focus: "Advanced Algorithms & Performance",
        hours: "25-30 hours",
        goals: [
          "Master advanced data structures",
          "Solve 20 hard/very hard problems",
          "Focus on performance optimization",
          "Study distributed algorithms",
        ],
      },
      {
        week: 2,
        focus: "Large-Scale System Design",
        hours: "25-30 hours",
        goals: [
          "Design streaming and media systems",
          "Study Netflix's architecture",
          "Learn about CDNs and video delivery",
          "Practice high-scale system design",
        ],
      },
      {
        week: 3,
        focus: "Data Engineering & ML",
        hours: "20-25 hours",
        goals: [
          "Study data pipeline design",
          "Learn recommendation algorithms",
          "Practice A/B testing concepts",
          "Understand real-time analytics",
        ],
      },
      {
        week: 4,
        focus: "Netflix Culture & Mock Interviews",
        hours: "15-20 hours",
        goals: [
          "Deep dive into Netflix culture",
          "Practice high-pressure interviews",
          "Prepare exceptional performance stories",
          "Study Netflix's technology blog and innovations",
        ],
      },
    ],
    salaryRanges: {
      "L4 (Senior Software Engineer)": "$250k - $350k",
      "L5 (Staff Software Engineer)": "$350k - $500k",
      "L6 (Senior Staff Software Engineer)": "$500k - $700k",
      "L7 (Principal Software Engineer)": "$700k - $900k",
      "L8 (Distinguished Engineer)": "$900k - $1.2M+",
    },
  },
}

// Component to render clickable problem links
function ProblemLink({ problemTitle }: { problemTitle: string }) {
  const problemSlug = getProblemSlugFromTitle(problemTitle)

  if (problemSlug) {
    return (
      <Link
        href={`/problems/${problemSlug}`}
        className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-1 group"
      >
        <span className="text-sm">{problemTitle}</span>
        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
    )
  }

  return <span className="text-gray-300 text-sm">{problemTitle}</span>
}

export default function CompanyGuidePage({ params }: { params: { company: string } }) {
  const company = companies[params.company.toLowerCase()]

  if (!company) {
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
              <Link href="/dashboard/big-6">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Big 6
                </Button>
              </Link>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${company.color} rounded-xl flex items-center justify-center text-white font-bold text-2xl`}
                >
                  {company.logo}
                </div>
                <div className="text-left">
                  <h1 className="text-4xl font-bold text-white">{company.name}</h1>
                  <p className="text-gray-400">{company.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  {company.employees} employees
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  Founded {company.founded}
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Avg {company.avgSalary}
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {company.completionRate}% success rate
                </div>
              </div>
            </div>

            {/* Overview */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-400" />
                  Company Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed mb-4">{company.overview}</p>
                <div>
                  <h4 className="text-white font-semibold mb-3">Company Culture</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {company.culture.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interview Process */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  Interview Process
                </CardTitle>
                <CardDescription className="text-gray-400">Typical interview rounds and what to expect</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {company.interviewProcess.map((round, index) => (
                    <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{round.round}</h4>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="border-purple-500 text-purple-300">
                            {round.duration}
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                            {round.focus}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">{round.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-yellow-500/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  Interview Tips & Strategies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {company.tips.map((tip, index) => (
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
                <CardDescription className="text-gray-400">
                  Company-specific problems and patterns to master
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {company.practiceProblems.map((category, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white">{category.category}</h4>
                        <Badge
                          variant="outline"
                          className={`${
                            category.difficulty === "Easy"
                              ? "border-green-500 text-green-400"
                              : category.difficulty === "Medium"
                                ? "border-yellow-500 text-yellow-400"
                                : category.difficulty === "Hard"
                                  ? "border-red-500 text-red-400"
                                  : category.difficulty === "Very Hard"
                                    ? "border-purple-500 text-purple-400"
                                    : "border-blue-500 text-blue-400"
                          }`}
                        >
                          {category.difficulty}
                        </Badge>
                      </div>
                      <ul className="space-y-2">
                        {category.problems.map((problem, problemIndex) => (
                          <li key={problemIndex} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                            <ProblemLink problemTitle={problem} />
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
                  4-Week Study Plan
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Structured preparation plan for {company.name} interviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {company.studyPlan.map((week, index) => (
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

            {/* Salary Ranges */}
            <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-500/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Salary Ranges
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Total compensation by level (base + bonus + equity)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(company.salaryRanges).map(([level, salary], index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                      <span className="text-gray-200 font-medium">{level}</span>
                      <span className="text-green-400 font-bold">{salary}</span>
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
                  Practice Mock Interview
                </Button>
              </Link>
              <Link href="/problems">
                <Button variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent">
                  <Code className="w-4 h-4 mr-2" />
                  Solve Practice Problems
                </Button>
              </Link>
              <Link href="/interview-guides">
                <Button variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Study Interview Guides
                </Button>
              </Link>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
