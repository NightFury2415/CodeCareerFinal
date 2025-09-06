"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, RotateCcw, Save, CheckCircle, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"

export default function ProblemDetailPage({ params }: { params: { slug: string } }) {
  const [problem, setProblem] = useState<any>(null)
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [code, setCode] = useState("")
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])

  // Get starter code templates for different problems
  const getStarterCode = (problemTitle: string, language: string) => {
    const starterCodes: Record<string, Record<string, string>> = {
      "Two Sum": {
        javascript: `function twoSum(nums, target) {
    // Write your solution here
    
}`,
        python: `def two_sum(nums, target):
    # Write your solution here
    pass`,
        java: `public int[] twoSum(int[] nums, int target) {
    // Write your solution here
    
}`,
        cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        
    }
};`,
      },
      "Group Anagrams": {
        javascript: `function groupAnagrams(strs) {
    // Write your solution here
    
}`,
        python: `def group_anagrams(strs):
    # Write your solution here
    pass`,
        java: `public List<List<String>> groupAnagrams(String[] strs) {
    // Write your solution here
    
}`,
        cpp: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        // Write your solution here
        
    }
};`,
      },
      "Valid Parentheses": {
        javascript: `function isValid(s) {
    // Write your solution here
    
}`,
        python: `def is_valid(s):
    # Write your solution here
    pass`,
        java: `public boolean isValid(String s) {
    // Write your solution here
    
}`,
        cpp: `class Solution {
public:
    bool isValid(string s) {
        // Write your solution here
        
    }
};`,
      },
      "Number of Islands": {
        javascript: `function numIslands(grid) {
    // Write your solution here
    
}`,
        python: `def num_islands(grid):
    # Write your solution here
    pass`,
        java: `public int numIslands(char[][] grid) {
    // Write your solution here
    
}`,
        cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        // Write your solution here
        
    }
};`,
      },
      "LRU Cache Implementation": {
        javascript: `class LRUCache {
    constructor(capacity) {
        // Write your solution here
    }
    
    get(key) {
        // Write your solution here
    }
    
    put(key, value) {
        // Write your solution here
    }
}`,
        python: `class LRUCache:
    def __init__(self, capacity):
        # Write your solution here
        pass
    
    def get(self, key):
        # Write your solution here
        pass
    
    def put(self, key, value):
        # Write your solution here
        pass`,
        java: `class LRUCache {
    public LRUCache(int capacity) {
        // Write your solution here
    }
    
    public int get(int key) {
        // Write your solution here
        
    }
    
    public void put(int key, int value) {
        // Write your solution here
        
    }
}`,
        cpp: `class LRUCache {
public:
    LRUCache(int capacity) {
        // Write your solution here
    }
    
    int get(int key) {
        // Write your solution here
        
    }
    
    void put(int key, int value) {
        // Write your solution here
        
    }
};`,
      },
    }

    // Default starter code if problem not found
    const defaultCode = {
      javascript: `function solution() {
    // Write your solution here
    
}`,
      python: `def solution():
    # Write your solution here
    pass`,
      java: `public class Solution {
    // Write your solution here
    
}`,
      cpp: `class Solution {
public:
    // Write your solution here
    
};`,
    }

    return starterCodes[problemTitle]?.[language] || defaultCode[language] || defaultCode.javascript
  }

  useEffect(() => {
    fetchProblem()
  }, [params.slug])

  useEffect(() => {
    if (problem) {
      const starterCode = getStarterCode(problem.title, selectedLanguage)
      setCode(starterCode)
    }
  }, [problem, selectedLanguage])

  const fetchProblem = async () => {
    try {
      const response = await fetch(`/api/problems/slug/${params.slug}`)
      const data = await response.json()
      if (data.problem) {
        setProblem(data.problem)
      }
    } catch (error) {
      console.error("Failed to fetch problem:", error)
    }
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    setConsoleOutput([])
    setTestResults([])
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setConsoleOutput([])

    try {
      const response = await fetch(`/api/problems/slug/${params.slug}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language: selectedLanguage }),
      })

      const result = await response.json()

      if (result.error) {
        setConsoleOutput([`Error: ${result.error}`])
        setTestResults([])
      } else {
        setTestResults(result.testResults)
        setConsoleOutput(result.consoleOutput || [])
      }
    } catch (error) {
      setConsoleOutput([`Network Error: ${error.message}`])
      setTestResults([])
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmit = async () => {
    setIsRunning(true)
    setConsoleOutput([])

    try {
      const response = await fetch(`/api/problems/slug/${params.slug}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language: selectedLanguage }),
      })

      const result = await response.json()

      if (result.success) {
        setConsoleOutput([
          "✅ Submission Successful!",
          `Runtime: ${result.runtime}`,
          `Memory: ${result.memory}`,
          result.ranking || "",
        ])
        setTestResults(result.testResults)
      } else {
        setConsoleOutput(["❌ Submission Failed", result.error || "Some test cases failed"])
        setTestResults(result.testResults || [])
      }
    } catch (error) {
      setConsoleOutput([`Submission Error: ${error.message}`])
    } finally {
      setIsRunning(false)
    }
  }

  const resetCode = () => {
    if (problem) {
      const starterCode = getStarterCode(problem.title, selectedLanguage)
      setCode(starterCode)
    }
    setTestResults([])
    setConsoleOutput([])
  }

  if (!problem) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen bg-slate-900">
          <AppSidebar />
          <SidebarInset className="flex-1 flex items-center justify-center">
            <div className="text-white">Loading problem...</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4">
            <SidebarTrigger className="text-white" />
            <div className="flex items-center gap-2 px-4">
              <h1 className="text-xl font-semibold text-white">{problem.title}</h1>
            </div>
          </header>

          <div className="flex-1 flex">
            {/* Problem Description */}
            <div className="w-1/2 border-r border-slate-800 overflow-y-auto">
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <h2 className="text-2xl font-bold text-white">{problem.title}</h2>
                    <Badge
                      variant="secondary"
                      className={`${
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
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6">
                    <span>Acceptance Rate: {problem.acceptance}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">{problem.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Examples</h3>
                  <div className="space-y-4">
                    {problem.examples.map((example, index) => (
                      <div key={index} className="bg-slate-800/50 p-4 rounded-lg">
                        <div className="font-semibold text-white mb-2">Example {index + 1}:</div>
                        <div className="space-y-1 text-sm">
                          <div>
                            <span className="text-gray-400">Input:</span>{" "}
                            <span className="text-gray-300">{example.input}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Output:</span>{" "}
                            <span className="text-gray-300">{example.output}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Explanation:</span>{" "}
                            <span className="text-gray-300">{example.explanation}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Constraints</h3>
                  <ul className="space-y-1 text-gray-300">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index} className="text-sm">
                        • {constraint}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-slate-600 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="w-1/2 flex flex-col">
              <div className="p-4 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetCode}
                      className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-4">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 bg-slate-800 border-slate-700 text-white font-mono text-sm resize-none"
                  placeholder="Write your code here..."
                />
              </div>

              <div className="p-4 border-t border-slate-800">
                <div className="flex items-center space-x-3 mb-4">
                  <Button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    variant="outline"
                    className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isRunning ? "Running..." : "Run Code"}
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isRunning}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {isRunning ? "Submitting..." : "Submit"}
                  </Button>
                </div>

                {/* Console Output */}
                {consoleOutput.length > 0 && (
                  <Card className="bg-slate-800/50 border-slate-700 mb-4">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-sm">Console</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-slate-900 p-3 rounded font-mono text-sm">
                        {consoleOutput.map((line, index) => (
                          <div
                            key={index}
                            className={`${line.startsWith("Error") || line.startsWith("❌") ? "text-red-400" : line.startsWith("✅") ? "text-green-400" : "text-gray-300"}`}
                          >
                            {line}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Test Results */}
                {testResults.length > 0 && (
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-sm">Test Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {testResults.map((result, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-slate-700/50 rounded text-sm"
                        >
                          <div className="flex items-center space-x-2">
                            {result.passed ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-red-500" />
                            )}
                            <span className="text-gray-300">{result.input}</span>
                          </div>
                          <div className="text-gray-400">
                            {result.passed ? "Passed" : `Failed - Expected: ${result.expected}, Got: ${result.actual}`}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
