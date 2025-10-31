import { NextResponse } from "next/server"

// Mock database storage
const resumeStorage: any[] = []

export async function POST(request: Request) {
  try {
    const resume = await request.json()

    // support both `personal` and legacy `personalInfo` shapes
    const personal = resume?.personal || resume?.personalInfo || {}

    console.log("/api/resume/save received", {
      hasResume: !!resume,
      personalKeys: Object.keys(personal),
    })

    // Validate required fields
    if (!personal?.firstName || !personal?.lastName) {
      return NextResponse.json(
        { error: "Please provide at least first and last name" },
        { status: 400 }
      )
    }

    // TODO: Save resume to database
    // For demo purposes, we'll simulate a successful save
    const savedResume = {
      ...resume,
      id: Math.random().toString(36).substring(7),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ 
      success: true,
      resume: savedResume,
      message: "Resume saved successfully"
    })
  } catch (error) {
    console.error("Error saving resume:", error)
    return NextResponse.json(
      { 
        error: "Failed to save resume",
        message: error instanceof Error ? error.message : "Unknown error occurred"
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ resumes: resumeStorage })
}
