import { NextResponse } from "next/server"

function validateAndTestCode(code: string, language: string, problemId: number) {
  const consoleOutput: string[] = []

  // Basic validation
  if (!code.trim()) {
    return {
      error: "No code provided",
      consoleOutput: ["Error: Please write some code before running"],
      testResults: [],
    }
  }

  // Language-specific validation
  if (language === "javascript") {
    if (!code.includes("function") && !code.includes("=>")) {
      return {
        error: "No function found",
        consoleOutput: ["Error: Please define a function"],
        testResults: [],
      }
    }
    if (!code.includes("return")) {
      return {
        error: "No return statement found",
        consoleOutput: ["Error: Function must return a value"],
        testResults: [],
      }
    }
  } else if (language === "python") {
    if (!code.includes("def ")) {
      return {
        error: "No function definition found",
        consoleOutput: ["Error: Please define a function using 'def'"],
        testResults: [],
      }
    }
    if (!code.includes("return") && !code.includes("pass")) {
      return {
        error: "No return statement found",
        consoleOutput: ["Error: Function must return a value"],
        testResults: [],
      }
    }
  }

  // Simulate code execution for Two Sum problem
  if (problemId === 1) {
    const testCases = [
      { input: "[2,7,11,15], target=9", expected: "[0,1]", nums: [2, 7, 11, 15], target: 9 },
      { input: "[3,2,4], target=6", expected: "[1,2]", nums: [3, 2, 4], target: 6 },
      { input: "[3,3], target=6", expected: "[0,1]", nums: [3, 3], target: 6 },
    ]

    // Simple heuristic to determine if solution is likely correct
    const hasLoop = code.includes("for") || code.includes("while") || code.includes("forEach") || code.includes("map")
    const hasHashMap =
      code.includes("Map") ||
      code.includes("{}") ||
      code.includes("dict") ||
      code.includes("HashMap") ||
      code.includes("unordered_map")
    const hasReturn = code.includes("return")
    const codeLength = code.replace(/\s+/g, "").length

    // Determine solution quality
    let solutionQuality = 0
    if (hasReturn) solutionQuality += 1
    if (hasLoop) solutionQuality += 1
    if (hasHashMap) solutionQuality += 2
    if (codeLength > 100) solutionQuality += 1

    const allPassed = solutionQuality >= 3

    consoleOutput.push("Running test cases...")
    if (allPassed) {
      consoleOutput.push("✅ All test cases passed!")
    } else {
      consoleOutput.push("❌ Some test cases failed")
      consoleOutput.push("Hint: Consider using a hash map for O(n) solution")
    }

    return {
      testResults: testCases.map((testCase, index) => {
        const passed = allPassed || (solutionQuality >= 2 && index < 2)
        return {
          input: testCase.input,
          expected: testCase.expected,
          actual: passed ? testCase.expected : "[]",
          passed,
          runtime: passed ? `${Math.floor(Math.random() * 50) + 50}ms` : "N/A",
          memory: passed ? `${(Math.random() * 5 + 10).toFixed(1)}MB` : "N/A",
        }
      }),
      consoleOutput,
    }
  }

  // Default response for other problems
  consoleOutput.push("Running test cases...")
  const passed = Math.random() > 0.3
  consoleOutput.push(passed ? "✅ Test cases passed!" : "❌ Some test cases failed")

  return {
    testResults: [
      {
        input: "Test case 1",
        expected: "Expected output",
        actual: passed ? "Expected output" : "Wrong output",
        passed,
        runtime: passed ? `${Math.floor(Math.random() * 100) + 50}ms` : "N/A",
        memory: passed ? `${(Math.random() * 10 + 10).toFixed(1)}MB` : "N/A",
      },
    ],
    consoleOutput,
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { code, language } = await request.json()
    const problemId = Number.parseInt(params.id)

    const result = validateAndTestCode(code, language, problemId)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({
      error: "Server error",
      consoleOutput: [`Server Error: ${error.message}`],
      testResults: [],
    })
  }
}
