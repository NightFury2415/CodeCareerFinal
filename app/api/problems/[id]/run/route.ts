import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { code, language } = await request.json()
    const problemId = params.id

    // Simulate code execution (in real app, this would use a code execution service)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock test results based on problem
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
