import { NextResponse } from "next/server"

const problems = {
  "two-sum": {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: "49.1%",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists.",
    ],
    tags: ["Array", "Hash Table"],
  },
  "group-anagrams": {
    id: 3,
    title: "Group Anagrams",
    difficulty: "Medium",
    acceptance: "67.5%",
    description: `Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
        explanation: "Group anagrams together.",
      },
      {
        input: 'strs = [""]',
        output: '[[""]]',
        explanation: "Single empty string forms one group.",
      },
      {
        input: 'strs = ["a"]',
        output: '[["a"]]',
        explanation: "Single character forms one group.",
      },
    ],
    constraints: [
      "1 ≤ strs.length ≤ 10⁴",
      "0 ≤ strs[i].length ≤ 100",
      "strs[i] consists of lowercase English letters.",
    ],
    tags: ["Array", "Hash Table", "String", "Sorting"],
  },
  "valid-parentheses": {
    id: 4,
    title: "Valid Parentheses",
    difficulty: "Easy",
    acceptance: "40.7%",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: "Valid parentheses.",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: "All brackets are properly closed.",
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation: "Mismatched brackets.",
      },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'."],
    tags: ["String", "Stack"],
  },
  "number-of-islands": {
    id: 13,
    title: "Number of Islands",
    difficulty: "Medium",
    acceptance: "57.8%",
    description: `Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    examples: [
      {
        input: `grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]`,
        output: "1",
        explanation: "There is 1 island.",
      },
      {
        input: `grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]`,
        output: "3",
        explanation: "There are 3 islands.",
      },
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 ≤ m, n ≤ 300", "grid[i][j] is '0' or '1'."],
    tags: ["Array", "Depth-First Search", "Breadth-First Search", "Union Find", "Matrix"],
  },
  "lru-cache-implementation": {
    id: 26,
    title: "LRU Cache Implementation",
    difficulty: "Medium",
    acceptance: "40.5%",
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:
- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
- int get(int key) Return the value of the key if the key exists, otherwise return -1.
- void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.`,
    examples: [
      {
        input: `["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]`,
        output: "[null, null, null, 1, null, -1, null, -1, 3, 4]",
        explanation: "LRU cache operations with capacity 2.",
      },
    ],
    constraints: [
      "1 ≤ capacity ≤ 3000",
      "0 ≤ key ≤ 10⁴",
      "0 ≤ value ≤ 10⁵",
      "At most 2 * 10⁵ calls will be made to get and put.",
    ],
    tags: ["Hash Table", "Linked List", "Design", "Doubly-Linked List"],
  },
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const problem = problems[params.slug as keyof typeof problems]

  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 })
  }

  return NextResponse.json({ problem })
}
