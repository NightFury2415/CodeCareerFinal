import { NextResponse } from "next/server"

// Mock database storage
const resumeStorage: any[] = []

export async function POST(request: Request) {
  try {
    const resumeData = await request.json()

    // In a real application, you would save this to your database
    // For now, we'll just simulate saving
    const savedResume = {
      id: Date.now().toString(),
      ...resumeData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    resumeStorage.push(savedResume)

    return NextResponse.json({
      success: true,
      message: "Resume saved successfully",
      resumeId: savedResume.id,
    })
  } catch (error) {
    console.error("Error saving resume:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to save resume",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({ resumes: resumeStorage })
}
