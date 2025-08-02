import { NextResponse } from "next/server"

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: "49.1%",
    category: "Array",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    tags: ["Array", "Hash Table"],
    timeLimit: "1s",
    memoryLimit: "256MB",
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    acceptance: "37.8%",
    category: "Linked List",
    description: "You are given two non-empty linked lists representing two non-negative integers.",
    tags: ["Linked List", "Math", "Recursion"],
    timeLimit: "2s",
    memoryLimit: "256MB",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    acceptance: "33.8%",
    category: "String",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    tags: ["Hash Table", "String", "Sliding Window"],
    timeLimit: "2s",
    memoryLimit: "256MB",
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    acceptance: "35.2%",
    category: "Array",
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    timeLimit: "3s",
    memoryLimit: "512MB",
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    acceptance: "32.1%",
    category: "String",
    description: "Given a string s, return the longest palindromic substring in s.",
    tags: ["String", "Dynamic Programming"],
    timeLimit: "2s",
    memoryLimit: "256MB",
  },
  {
    id: 6,
    title: "ZigZag Conversion",
    difficulty: "Medium",
    acceptance: "42.3%",
    category: "String",
    description: "The string 'PAYPALISHIRING' is written in a zigzag pattern on a given number of rows.",
    tags: ["String"],
    timeLimit: "2s",
    memoryLimit: "256MB",
  },
  {
    id: 7,
    title: "Reverse Integer",
    difficulty: "Medium",
    acceptance: "27.1%",
    category: "Math",
    description: "Given a signed 32-bit integer x, return x with its digits reversed.",
    tags: ["Math"],
    timeLimit: "1s",
    memoryLimit: "256MB",
  },
  {
    id: 8,
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    acceptance: "16.4%",
    category: "String",
    description: "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.",
    tags: ["String"],
    timeLimit: "1s",
    memoryLimit: "256MB",
  },
  {
    id: 9,
    title: "Palindrome Number",
    difficulty: "Easy",
    acceptance: "52.7%",
    category: "Math",
    description: "Given an integer x, return true if x is palindrome integer.",
    tags: ["Math"],
    timeLimit: "1s",
    memoryLimit: "256MB",
  },
  {
    id: 10,
    title: "Regular Expression Matching",
    difficulty: "Hard",
    acceptance: "27.9%",
    category: "String",
    description:
      "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.",
    tags: ["String", "Dynamic Programming", "Recursion"],
    timeLimit: "3s",
    memoryLimit: "512MB",
  },
  {
    id: 11,
    title: "Container With Most Water",
    difficulty: "Medium",
    acceptance: "54.1%",
    category: "Array",
    description:
      "You are given an integer array height of length n. Find two lines that together with the x-axis form a container.",
    tags: ["Array", "Two Pointers", "Greedy"],
    timeLimit: "2s",
    memoryLimit: "256MB",
  },
  {
    id: 12,
    title: "Integer to Roman",
    difficulty: "Medium",
    acceptance: "61.2%",
    category: "Hash Table",
    description: "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.",
    tags: ["Hash Table", "Math", "String"],
    timeLimit: "1s",
    memoryLimit: "256MB",
  },
  {
    id: 13,
    title: "Roman to Integer",
    difficulty: "Easy",
    acceptance: "58.4%",
    category: "Hash Table",
    description: "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.",
    tags: ["Hash Table", "Math", "String"],
    timeLimit: "1s",
    memoryLimit: "256MB",
  },
  {
    id: 14,
    title: "Longest Common Prefix",
    difficulty: "Easy",
    acceptance: "40.1%",
    category: "String",
    description: "Write a function to find the longest common prefix string amongst an array of strings.",
    tags: ["String", "Trie"],
    timeLimit: "1s",
    memoryLimit: "256MB",
  },
  {
    id: 15,
    title: "3Sum",
    difficulty: "Medium",
    acceptance: "32.4%",
    category: "Array",
    description:
      "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
    tags: ["Array", "Two Pointers", "Sorting"],
    timeLimit: "2s",
    memoryLimit: "256MB",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const difficulty = searchParams.get("difficulty")
  const category = searchParams.get("category")
  const search = searchParams.get("search")

  let filteredProblems = problems

  if (difficulty && difficulty !== "all") {
    filteredProblems = filteredProblems.filter((p) => p.difficulty.toLowerCase() === difficulty.toLowerCase())
  }

  if (category && category !== "all") {
    filteredProblems = filteredProblems.filter((p) => p.category.toLowerCase() === category.toLowerCase())
  }

  if (search) {
    filteredProblems = filteredProblems.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())),
    )
  }

  return NextResponse.json({ problems: filteredProblems })
}

export async function POST(request: Request) {
  const { title, difficulty, category, description } = await request.json()

  const newProblem = {
    id: problems.length + 1,
    title,
    difficulty,
    category,
    description,
    acceptance: "0%",
    examples: [],
    constraints: [],
    tags: [],
    timeLimit: "1s",
    memoryLimit: "256MB",
  }

  problems.push(newProblem)

  return NextResponse.json({ problem: newProblem }, { status: 201 })
}
