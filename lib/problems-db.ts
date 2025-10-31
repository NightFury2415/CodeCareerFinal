// Complete problems database with all details for coding environment
export const problemsDatabase = {
  "two-sum": {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: "49.1%",
    category: "Array",
    tags: ["Array", "Hash Table"],
    companies: ["Google", "Amazon", "Apple"],
    description: `Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.

You may assume that each input has exactly one solution, and you may not use the same element twice.

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
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, output: [0, 1] },
      { input: { nums: [3, 2, 4], target: 6 }, output: [1, 2] },
      { input: { nums: [3, 3], target: 6 }, output: [0, 1] },
    ],
  },
  "valid-parentheses": {
    id: 4,
    title: "Valid Parentheses",
    difficulty: "Easy",
    acceptance: "40.7%",
    category: "Stack",
    tags: ["String", "Stack"],
    companies: ["Google", "Amazon", "Microsoft"],
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: "The string is a valid parentheses sequence.",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: "Mixed valid parentheses.",
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation: "Wrong type of closing bracket.",
      },
    ],
    constraints: ["1 <= s.length <= 10^4", "s is composed of parentheses only: () {} []"],
    testCases: [
      { input: { s: "()" }, output: true },
      { input: { s: "()[]{}" }, output: true },
      { input: { s: "(]" }, output: false },
      { input: { s: "([)]" }, output: false },
      { input: { s: "{[]}" }, output: true },
    ],
  },
  "group-anagrams": {
    id: 3,
    title: "Group Anagrams",
    difficulty: "Medium",
    acceptance: "67.5%",
    category: "String",
    tags: ["Array", "Hash Table", "String", "Sorting"],
    companies: ["Google", "Amazon"],
    description: `Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
        explanation: 'There is no string in strs that can be rearranged to form "bat".',
      },
      {
        input: 'strs = [""]',
        output: '[[""]]',
        explanation: "Single empty string.",
      },
    ],
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters.",
    ],
    testCases: [
      {
        input: { strs: ["eat", "tea", "tan", "ate", "nat", "bat"] },
        output: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]],
      },
      { input: { strs: [""] }, output: [[""]] },
      { input: { strs: ["a"] }, output: [["a"]] },
    ],
  },
  "number-of-islands": {
    id: 13,
    title: "Number of Islands",
    difficulty: "Medium",
    acceptance: "57.8%",
    category: "Graph",
    tags: ["Array", "Depth-First Search", "Breadth-First Search", "Union Find", "Matrix"],
    companies: ["Google", "Amazon", "Meta"],
    description: `Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    examples: [
      {
        input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: "1",
        explanation: "One island formed.",
      },
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300", 'grid[i][j] is "0" or "1".'],
    testCases: [
      {
        input: {
          grid: [
            ["1", "1", "1", "1", "0"],
            ["1", "1", "0", "1", "0"],
            ["1", "1", "0", "0", "0"],
            ["0", "0", "0", "0", "0"],
          ],
        },
        output: 1,
      },
    ],
  },
  "lru-cache-implementation": {
    id: 26,
    title: "LRU Cache Implementation",
    difficulty: "Medium",
    acceptance: "40.5%",
    category: "Design",
    tags: ["Hash Table", "Linked List", "Design", "Doubly-Linked List"],
    companies: ["Apple", "Amazon", "Microsoft"],
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:
- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
- int get(int key) Return the value of the key if the key exists, otherwise return -1.
- void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.`,
    examples: [
      {
        input:
          '["LRUCache","put","put","get","put","get","put","get","get","get"]\\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]',
        output: "[null,null,null,1,null,-1,null,-1,3,4]",
        explanation: "LRU cache with capacity 2. After operations, key 2 is evicted.",
      },
    ],
    constraints: [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
      "At most 2 * 10^5 calls will be made to get and put.",
    ],
    testCases: [
      {
        input: { operations: ["get", "put"], capacity: 2, params: [[1], [1, 1]] },
        output: [-1, null],
      },
    ],
  },
}

export type ProblemSlug = keyof typeof problemsDatabase
