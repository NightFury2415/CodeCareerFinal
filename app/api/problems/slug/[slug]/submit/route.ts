import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { code, language } = await request.json()
    const slug = params.slug

    // Simulate submission processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock submission results based on problem slug
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
        {
          input: "nums = [3,3], target = 6",
          expected: "[0,1]",
          actual: "[0,1]",
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
        {
          input: 'strs = [""]',
          expected: '[[""]]',
          actual: '[[""]]',
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
        {
          input: 's = "(]"',
          expected: "false",
          actual: "false",
          passed: true,
        },
      ]
    } else {
      // Default submission results
      mockResults = [
        {
          input: "Test case 1",
          expected: "Expected output",
          actual: "Expected output",
          passed: true,
        },
      ]
    }

    const allPassed = mockResults.every((result) => result.passed)

    return NextResponse.json({
      success: allPassed,
      testResults: mockResults,
      runtime: "68 ms",
      memory: "15.2 MB",
      ranking: allPassed ? "Beats 85.4% of users" : null,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Submission failed",
      },
      { status: 500 },
    )
  }
}
