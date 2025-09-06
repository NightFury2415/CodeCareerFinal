"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { FileText, Download, Edit, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ResumePreviewPage() {
  const router = useRouter()
  const [resumeData, setResumeData] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem("resumePreviewData")
    if (data) {
      setResumeData(JSON.parse(data))
    } else {
      router.push("/dashboard/resume")
    }
  }, [router])

  const downloadResume = async () => {
    if (!resumeData) return

    try {
      const response = await fetch("/api/resume/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `resume-${resumeData.personalInfo?.firstName}-${resumeData.personalInfo?.lastName}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error("Failed to download resume:", error)
    }
  }

  if (!resumeData) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen bg-gray-950">
          <AppSidebar />
          <SidebarInset className="flex-1 flex items-center justify-center">
            <div className="text-white">Loading resume preview...</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-950">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800 px-4">
            <SidebarTrigger className="text-white" />
            <div className="flex items-center gap-2 px-4">
              <FileText className="w-5 h-5 text-purple-400" />
              <h1 className="text-xl font-semibold text-white">Resume Preview</h1>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button
                onClick={() => router.push("/dashboard/resume")}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Editor
              </Button>
              <Button
                onClick={() => router.push("/dashboard/resume")}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button onClick={downloadResume} className="bg-purple-600 hover:bg-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </header>

          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white text-black p-8 rounded-lg shadow-lg min-h-[11in]">
                {/* Header */}
                <div className="text-center mb-8 border-b-2 border-gray-800 pb-6">
                  <h1 className="text-3xl font-bold mb-2">
                    {resumeData.personalInfo?.firstName} {resumeData.personalInfo?.lastName}
                  </h1>
                  <div className="text-gray-600 text-sm">
                    {resumeData.personalInfo?.email} | {resumeData.personalInfo?.phone} |{" "}
                    {resumeData.personalInfo?.location}
                    {resumeData.personalInfo?.linkedin && ` | LinkedIn: ${resumeData.personalInfo.linkedin}`}
                    {resumeData.personalInfo?.github && ` | GitHub: ${resumeData.personalInfo.github}`}
                  </div>
                </div>

                {/* Professional Summary */}
                {resumeData.personalInfo?.summary && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-3 border-b border-gray-300 pb-1">Professional Summary</h2>
                    <p className="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
                  </div>
                )}

                {/* Experience */}
                {resumeData.experience?.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-3 border-b border-gray-300 pb-1">Experience</h2>
                    {resumeData.experience.map((exp: any, index: number) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-semibold text-lg">{exp.position}</h3>
                            <p className="text-gray-600 italic">{exp.company}</p>
                          </div>
                          <p className="text-gray-600 text-sm">
                            {exp.startDate} - {exp.endDate || "Present"}
                          </p>
                        </div>
                        {exp.description && <p className="text-gray-700 mt-2 leading-relaxed">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {resumeData.education?.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-3 border-b border-gray-300 pb-1">Education</h2>
                    {resumeData.education.map((edu: any, index: number) => (
                      <div key={index} className="mb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{edu.degree}</h3>
                            <p className="text-gray-600 italic">{edu.school}</p>
                          </div>
                          <p className="text-gray-600 text-sm">{edu.graduationDate}</p>
                        </div>
                        {edu.gpa && <p className="text-gray-700 mt-1">GPA: {edu.gpa}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {resumeData.skills?.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-3 border-b border-gray-300 pb-1">Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {resumeData.skills.map((skillGroup: any, index: number) => (
                        <div key={index}>
                          <h4 className="font-semibold mb-1">{skillGroup.category}</h4>
                          <p className="text-gray-700">{skillGroup.skills}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {resumeData.projects?.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-3 border-b border-gray-300 pb-1">Projects</h2>
                    {resumeData.projects.map((project: any, index: number) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold">{project.name}</h3>
                          <p className="text-gray-600 text-sm">{project.date}</p>
                        </div>
                        {project.description && (
                          <p className="text-gray-700 mb-2 leading-relaxed">{project.description}</p>
                        )}
                        {project.technologies && (
                          <p className="text-gray-600">
                            <strong>Technologies:</strong> {project.technologies}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
