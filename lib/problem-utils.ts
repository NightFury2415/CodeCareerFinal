// Utility functions for problem management and mapping

// Problem title to slug mapping
const problemTitleToSlug: Record<string, string> = {
  // Existing problems
  "Two Sum": "two-sum",

  // Google problems
  "Longest Substring Without Repeating Characters": "longest-substring-without-repeating-characters",
  "Group Anagrams": "group-anagrams",
  "Valid Parentheses": "valid-parentheses",
  "Merge Intervals": "merge-intervals",
  "Spiral Matrix": "spiral-matrix",
  "Rotate Image": "rotate-image",
  "String to Integer (atoi)": "string-to-integer-atoi",
  "ZigZag Conversion": "zigzag-conversion",
  "Binary Tree Maximum Path Sum": "binary-tree-maximum-path-sum",
  "Serialize and Deserialize Binary Tree": "serialize-and-deserialize-binary-tree",
  "Word Ladder": "word-ladder",
  "Number of Islands": "number-of-islands",
  "Clone Graph": "clone-graph",
  "Course Schedule": "course-schedule",
  "Binary Tree Level Order Traversal": "binary-tree-level-order-traversal",
  "Validate Binary Search Tree": "validate-binary-search-tree",
  "Edit Distance": "edit-distance",
  "Regular Expression Matching": "regular-expression-matching",
  "Longest Increasing Subsequence": "longest-increasing-subsequence",
  "Maximum Subarray": "maximum-subarray",
  "Coin Change": "coin-change",
  "Unique Paths": "unique-paths",
  "Word Break": "word-break",
  "Palindrome Partitioning": "palindrome-partitioning",

  // Apple problems
  "LRU Cache Implementation": "lru-cache-implementation",
  "Design File System": "design-file-system",
  "Implement Trie (Prefix Tree)": "implement-trie-prefix-tree",
  "Binary Search Variations": "binary-search-variations",
  "Sliding Window Maximum": "sliding-window-maximum",
  "Design Hit Counter": "design-hit-counter",
  "Implement Stack with Min Function": "implement-stack-with-min-function",
  "Design Circular Queue": "design-circular-queue",

  // Microsoft problems
  "Merge k Sorted Lists": "merge-k-sorted-lists",
  "Design LRU Cache": "design-lru-cache",
  "Implement Trie Data Structure": "implement-trie-data-structure",
  "Find Median from Data Stream": "find-median-from-data-stream",
  "Design Twitter Feed": "design-twitter-feed",
  "Implement Rate Limiter": "implement-rate-limiter",
  "Design Search Autocomplete": "design-search-autocomplete",
  "Build Expression Evaluator": "build-expression-evaluator",
  "Binary Tree Right Side View": "binary-tree-right-side-view",
  "Word Search II": "word-search-ii",
  "Design Add and Search Words": "design-add-and-search-words",
  "Implement Queue using Stacks": "implement-queue-using-stacks",
  "Find All Anagrams in String": "find-all-anagrams-in-string",
  "Design Circular Deque": "design-circular-deque",
  "Implement Min Stack": "implement-min-stack",

  // Amazon problems
  "Critical Connections in a Network": "critical-connections-in-a-network",
  "Reorder Data in Log Files": "reorder-data-in-log-files",
  "Prison Cells After N Days": "prison-cells-after-n-days",
  "Copy List with Random Pointer": "copy-list-with-random-pointer",
  "Rotting Oranges": "rotting-oranges",
  "K Closest Points to Origin": "k-closest-points-to-origin",
  "Top K Frequent Elements": "top-k-frequent-elements",
  "Meeting Rooms II": "meeting-rooms-ii",
  "Analyze User Website Visit Pattern": "analyze-user-website-visit-pattern",
  "Minimum Cost to Connect Sticks": "minimum-cost-to-connect-sticks",

  // Meta problems
  "Valid Palindrome II": "valid-palindrome-ii",
  "Binary Tree Vertical Order Traversal": "binary-tree-vertical-order-traversal",
  "Remove Invalid Parentheses": "remove-invalid-parentheses",
  "Subarray Sum Equals K": "subarray-sum-equals-k",
  "Exclusive Time of Functions": "exclusive-time-of-functions",
  "Random Pick with Weight": "random-pick-with-weight",
  "Minimum Remove to Make Valid Parentheses": "minimum-remove-to-make-valid-parentheses",
  "Accounts Merge": "accounts-merge",
  "Word Ladder II": "word-ladder-ii",
  "Alien Dictionary": "alien-dictionary",
  "Lowest Common Ancestor of Binary Tree": "lowest-common-ancestor-of-binary-tree",
  "Construct Binary Tree from Preorder and Inorder": "construct-binary-tree-from-preorder-and-inorder",
}

// Reverse mapping from slug to title
const slugToTitle: Record<string, string> = Object.fromEntries(
  Object.entries(problemTitleToSlug).map(([title, slug]) => [slug, title]),
)

// Function to get problem slug from title
export function getProblemSlugFromTitle(title: string): string | null {
  return problemTitleToSlug[title] || null
}

// Function to get problem title from slug
export function getProblemTitleFromSlug(slug: string): string | null {
  return slugToTitle[slug] || null
}

// Function to create URL-friendly slug from title
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

// Function to get all problem titles
export function getAllProblemTitles(): string[] {
  return Object.keys(problemTitleToSlug)
}

// Function to check if problem exists
export function problemExists(title: string): boolean {
  return title in problemTitleToSlug
}

// Function to check if slug exists
export function slugExists(slug: string): boolean {
  return slug in slugToTitle
}
