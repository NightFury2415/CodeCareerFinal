import { NextResponse } from "next/server"

const savedResumes: any[] = []

export async function POST(request: Request) {
  try {
    const resumeData = await request.json()

    const resume = {
      id: Date.now().toString(),
      ...resumeData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    savedResumes.push(resume)

    return NextResponse.json({ success: true, resume })
  } catch (error) {
    console.error("Error saving resume:", error)
    return NextResponse.json({ error: "Failed to save resume" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  // In a real app, filter by userId
  return NextResponse.json({ resumes: savedResumes })
}
