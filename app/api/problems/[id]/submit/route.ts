import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { code, language } = await request.json()
    const problemId = Number.parseInt(params.id)

    // Comprehensive validation for submission
    if (!code.trim()) {
      return NextResponse.json({
        success: false,
        error: "No code provided",
        testResults: [],
      })
    }

    // Language-specific validation
    let hasValidStructure = false
    if (language === "javascript") {
      hasValidStructure = (code.includes("function") || code.includes("=>")) && code.includes("return")
    } else if (language === "python") {
      hasValidStructure = code.includes("def ") && (code.includes("return") || code.includes("pass"))
    } else if (language === "java") {
      hasValidStructure = code.includes("public") && code.includes("return")
    } else if (language === "cpp") {
      hasValidStructure = code.includes("vector") && code.includes("return")
    }

    if (!hasValidStructure) {
      return NextResponse.json({
        success: false,
        error: "Invalid function structure",
        testResults: [],
      })
    }

    // Simulate comprehensive testing for Two Sum
    if (problemId === 1) {
      const testCases = [
        { input: "[2,7,11,15], target=9", expected: "[0,1]", nums: [2, 7, 11, 15], target: 9 },
        { input: "[3,2,4], target=6", expected: "[1,2]", nums: [3, 2, 4], target: 6 },
        { input: "[3,3], target=6", expected: "[0,1]", nums: [3, 3], target: 6 },
        { input: "[1,2,3,4], target=7", expected: "[2,3]", nums: [1, 2, 3, 4], target: 7 },
        { input: "[0,4,3,0], target=0", expected: "[0,3]", nums: [0, 4, 3, 0], target: 0 },
      ]

      // Advanced solution detection
      const hasHashMap =
        code.includes("Map") ||
        code.includes("{}") ||
        code.includes("dict") ||
        code.includes("HashMap") ||
        code.includes("unordered_map")
      const hasNestedLoop = (code.match(/for/g) || []).length >= 2 || (code.match(/while/g) || []).length >= 2
      const hasReturn = code.includes("return")
      const codeComplexity = code.replace(/\s+/g, "").length

      // Determine solution efficiency
      let efficiency = 0
      if (hasReturn) efficiency += 1
      if (hasHashMap && !hasNestedLoop)
        efficiency += 3 // Optimal solution
      else if (hasNestedLoop) efficiency += 1 // Brute force
      if (codeComplexity > 150) efficiency += 1

      const allPassed = efficiency >= 3
      const partialPassed = efficiency >= 2

      const results = testCases.map((testCase, index) => {
        let passed = false
        if (allPassed) passed = true
        else if (partialPassed) passed = index < 3
        else passed = index < 1

        return {
          input: testCase.input,
          expected: testCase.expected,
          actual: passed ? testCase.expected : "[]",
          passed,
          runtime: passed ? `${Math.floor(Math.random() * 50) + 60}ms` : "TLE",
          memory: passed ? `${(Math.random() * 5 + 12).toFixed(1)}MB` : "N/A",
        }
      })

      const successCount = results.filter((r) => r.passed).length
      const success = successCount === testCases.length

      return NextResponse.json({
        success,
        testResults: results,
        runtime: success ? `${Math.floor(Math.random() * 50) + 60}ms` : "N/A",
        memory: success ? `${(Math.random() * 5 + 12).toFixed(1)}MB` : "N/A",
        ranking: success ? `Beats ${Math.floor(Math.random() * 30) + 70}% of submissions` : null,
        error: success ? null : `${successCount}/${testCases.length} test cases passed`,
      })
    }

    // Default submission response
    const success = Math.random() > 0.4
    return NextResponse.json({
      success,
      testResults: [
        {
          input: "Test case 1",
          expected: "Expected output",
          actual: success ? "Expected output" : "Wrong output",
          passed: success,
          runtime: success ? `${Math.floor(Math.random() * 100) + 50}ms` : "TLE",
          memory: success ? `${(Math.random() * 10 + 10).toFixed(1)}MB` : "N/A",
        },
      ],
      runtime: success ? `${Math.floor(Math.random() * 100) + 50}ms` : "N/A",
      memory: success ? `${(Math.random() * 10 + 10).toFixed(1)}MB` : "N/A",
      ranking: success ? `Beats ${Math.floor(Math.random() * 50) + 50}% of submissions` : null,
      error: success ? null : "Solution failed on some test cases",
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: `Server error: ${error.message}`,
      testResults: [],
    })
  }
}
