import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { code, language } = await request.json()
    const slug = params.slug

    // Simulate code execution
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock test results based on problem slug
    let mockResults = []

    if (slug === "two-sum") {
      mockResults = [
        {
          input: "nums = [2,7,11,15], target = 9",
          expected: "[0,1]",
          actual: "[0,1]",
          passed: true,
        },
        {
          input: "nums = [3,2,4], target = 6",
          expected: "[1,2]",
          actual: "[1,2]",
          passed: true,
        },
      ]
    } else if (slug === "group-anagrams") {
      mockResults = [
        {
          input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
          expected: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
          actual: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
          passed: true,
        },
      ]
    } else if (slug === "valid-parentheses") {
      mockResults = [
        {
          input: 's = "()"',
          expected: "true",
          actual: "true",
          passed: true,
        },
        {
          input: 's = "()[]{}"',
          expected: "true",
          actual: "true",
          passed: true,
        },
      ]
    } else {
      // Default test results
      mockResults = [
        {
          input: "Test case 1",
          expected: "Expected output",
          actual: "Expected output",
          passed: true,
        },
      ]
    }

    return NextResponse.json({
      testResults: mockResults,
      consoleOutput: ["Code executed successfully", "All test cases passed"],
      success: true,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to run code",
        consoleOutput: [`Error: ${error.message}`],
      },
      { status: 500 },
    )
  }
}
