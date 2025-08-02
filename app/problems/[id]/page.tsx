"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, RotateCcw, Save, CheckCircle, AlertCircle, Code, BookOpen } from "lucide-react"
import { useState, useEffect } from "react"

export default function ProblemDetailPage({ params }: { params: { id: string } }) {
  const starterCodes = {
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
  }

  const solutions = {
    javascript: {
      bruteForce: {
        title: "Brute Force",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        code: `function twoSum(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}`,
        explanation:
          "Check every pair of numbers to see if they sum to target. Simple but inefficient for large arrays.",
      },
      optimal: {
        title: "Hash Map (Optimal)",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        code: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
        explanation:
          "Use a hash map to store numbers we've seen. For each number, check if its complement exists in the map.",
      },
    },
    python: {
      bruteForce: {
        title: "Brute Force",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        code: `def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
        explanation:
          "Check every pair of numbers to see if they sum to target. Simple but inefficient for large arrays.",
      },
      optimal: {
        title: "Hash Map (Optimal)",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        code: `def two_sum(nums, target):
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
        
        num_map[num] = i
    
    return []`,
        explanation:
          "Use a dictionary to store numbers we've seen. For each number, check if its complement exists in the dictionary.",
      },
    },
    java: {
      bruteForce: {
        title: "Brute Force",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        code: `public int[] twoSum(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return new int[]{i, j};
            }
        }
    }
    return new int[]{};
}`,
        explanation:
          "Check every pair of numbers to see if they sum to target. Simple but inefficient for large arrays.",
      },
      optimal: {
        title: "Hash Map (Optimal)",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        code: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        
        map.put(nums[i], i);
    }
    
    return new int[]{};
}`,
        explanation:
          "Use a HashMap to store numbers we've seen. For each number, check if its complement exists in the map.",
      },
    },
    cpp: {
      bruteForce: {
        title: "Brute Force",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        code: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }
        return {};
    }
};`,
        explanation:
          "Check every pair of numbers to see if they sum to target. Simple but inefficient for large arrays.",
      },
      optimal: {
        title: "Hash Map (Optimal)",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        code: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            
            map[nums[i]] = i;
        }
        
        return {};
    }
};`,
        explanation:
          "Use an unordered_map to store numbers we've seen. For each number, check if its complement exists in the map.",
      },
    },
  }

  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [code, setCode] = useState(starterCodes.javascript)
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const [problem, setProblem] = useState<any>(null)

  useEffect(() => {
    fetchProblem()
  }, [params.id])

  const fetchProblem = async () => {
    try {
      const response = await fetch(`/api/problems/${params.id}`)
      const data = await response.json()
      setProblem(data.problem)
    } catch (error) {
      console.error("Failed to fetch problem:", error)
    }
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    setCode(starterCodes[language as keyof typeof starterCodes] || starterCodes.javascript)
    setConsoleOutput([])
    setTestResults([])
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setConsoleOutput([])

    try {
      const response = await fetch(`/api/problems/${params.id}/run`, {
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
      const response = await fetch(`/api/problems/${params.id}/submit`, {
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
    setCode(starterCodes[selectedLanguage as keyof typeof starterCodes] || starterCodes.javascript)
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
              <h1 className="text-xl font-semibold text-white">Problem #{problem.id}</h1>
            </div>
          </header>

          <div className="flex-1 flex">
            {/* Problem Description & Solutions */}
            <div className="w-1/2 border-r border-slate-800 overflow-y-auto">
              <Tabs defaultValue="description" className="h-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-800 border-b border-slate-700 rounded-none">
                  <TabsTrigger value="description" className="text-gray-300 data-[state=active]:text-white">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Description
                  </TabsTrigger>
                  <TabsTrigger value="solutions" className="text-gray-300 data-[state=active]:text-white">
                    <Code className="w-4 h-4 mr-2" />
                    Solutions
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="p-6 space-y-6 m-0">
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
                </TabsContent>

                <TabsContent value="solutions" className="p-6 space-y-6 m-0">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Solutions</h2>
                    <p className="text-gray-400 mb-6">
                      Multiple approaches to solve this problem, from brute force to optimal solutions.
                    </p>
                  </div>

                  <Tabs defaultValue="bruteForce" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-slate-800">
                      <TabsTrigger value="bruteForce" className="text-gray-300 data-[state=active]:text-white">
                        Brute Force
                      </TabsTrigger>
                      <TabsTrigger value="optimal" className="text-gray-300 data-[state=active]:text-white">
                        Optimal
                      </TabsTrigger>
                    </TabsList>

                    {Object.entries(solutions[selectedLanguage as keyof typeof solutions] || solutions.javascript).map(
                      ([key, solution]) => (
                        <TabsContent key={key} value={key} className="space-y-4">
                          <Card className="bg-slate-800/50 border-slate-700">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-white">{solution.title}</CardTitle>
                                <div className="flex space-x-4 text-sm">
                                  <Badge className="bg-blue-500/20 text-blue-400">
                                    Time: {solution.timeComplexity}
                                  </Badge>
                                  <Badge className="bg-purple-500/20 text-purple-400">
                                    Space: {solution.spaceComplexity}
                                  </Badge>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div>
                                <h4 className="text-white font-semibold mb-2">Approach:</h4>
                                <p className="text-gray-300 text-sm">{solution.explanation}</p>
                              </div>
                              <div>
                                <h4 className="text-white font-semibold mb-2">Code:</h4>
                                <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                                  <pre className="text-gray-300 text-sm font-mono whitespace-pre">
                                    <code>{solution.code}</code>
                                  </pre>
                                </div>
                              </div>
                              <Button
                                onClick={() => setCode(solution.code)}
                                className="bg-purple-600 hover:bg-purple-700"
                              >
                                Use This Solution
                              </Button>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      ),
                    )}
                  </Tabs>
                </TabsContent>
              </Tabs>
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
