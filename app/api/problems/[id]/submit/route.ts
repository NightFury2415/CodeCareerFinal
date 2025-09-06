import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { code, language } = await request.json()
    const problemId = params.id

    // Simulate submission processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock submission results
    const mockResults = [
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
