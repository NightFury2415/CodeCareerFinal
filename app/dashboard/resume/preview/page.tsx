"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Edit, FileText } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ResumePreviewPage() {
  const router = useRouter()
  const [resumeData, setResumeData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const savedData = sessionStorage.getItem("resumePreview")
    if (savedData) {
      setResumeData(JSON.parse(savedData))
    } else {
      router.push("/dashboard/resume")
    }
  }, [router])

  const downloadResume = async () => {
    if (!resumeData) return

    setIsLoading(true)
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
        a.style.display = "none"
        a.href = url
        a.download = `${resumeData.personal.firstName || "Resume"}_${resumeData.personal.lastName || "CV"}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert("Failed to generate PDF. Please try again.")
      }
    } catch (error) {
      console.error("Download failed:", error)
      alert("Failed to download resume. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!resumeData) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen bg-gray-950">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Loading resume preview...</p>
              </div>
            </div>
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
            <div className="ml-auto flex items-center gap-4">
              <Button
                onClick={() => router.push("/dashboard/resume")}
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Editor
              </Button>
              <Button
                onClick={() => router.push("/dashboard/resume")}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Resume
              </Button>
              <Button
                onClick={downloadResume}
                disabled={isLoading}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="w-4 h-4 mr-2" />
                {isLoading ? "Generating..." : "Download PDF"}
              </Button>
            </div>
          </header>

          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                <div className="bg-gray-100 px-6 py-3 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {resumeData.personal.firstName} {resumeData.personal.lastName} - Resume
                  </h3>
                  <p className="text-sm text-gray-600">ATS-Optimized Professional Resume</p>
                </div>

                <div className="p-12 print:p-8">
                  <div className="space-y-8">
                    {/* Header */}
                    <div className="text-center border-b-2 border-gray-200 pb-6">
                      <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        {resumeData.personal.firstName || "Your Name"} {resumeData.personal.lastName}
                      </h1>
                      <div className="flex flex-wrap justify-center gap-4 text-base text-gray-600 mb-2">
                        {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                        {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
                        {resumeData.personal.location && <span>{resumeData.personal.location}</span>}
                      </div>
                      {(resumeData.personal.linkedin || resumeData.personal.github) && (
                        <div className="flex flex-wrap justify-center gap-4 text-base text-blue-600">
                          {resumeData.personal.linkedin && <span>{resumeData.personal.linkedin}</span>}
                          {resumeData.personal.github && <span>{resumeData.personal.github}</span>}
                        </div>
                      )}
                    </div>

                    {/* Summary */}
                    {resumeData.personal.summary && (
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                          PROFESSIONAL SUMMARY
                        </h2>
                        <p className="text-gray-700 leading-relaxed">{resumeData.personal.summary}</p>
                      </div>
                    )}

                    {/* Experience */}
                    {resumeData.experience.length > 0 && (
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                          PROFESSIONAL EXPERIENCE
                        </h2>
                        <div className="space-y-6">
                          {resumeData.experience.map((exp) => (
                            <div key={exp.id}>
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900">{exp.title || "Job Title"}</h3>
                                  <p className="text-gray-700">
                                    {exp.company || "Company Name"} {exp.location && `• ${exp.location}`}
                                  </p>
                                </div>
                                <span className="text-gray-600 font-medium">
                                  {exp.startDate} - {exp.current ? "Present" : exp.endDate || "End Date"}
                                </span>
                              </div>
                              {exp.description && (
                                <div className="text-gray-700 mt-3 whitespace-pre-line leading-relaxed">
                                  {exp.description}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {resumeData.education.length > 0 && (
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                          EDUCATION
                        </h2>
                        <div className="space-y-4">
                          {resumeData.education.map((edu) => (
                            <div key={edu.id}>
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900">{edu.degree || "Degree"}</h3>
                                  <p className="text-gray-700">
                                    {edu.school || "School Name"} {edu.location && `• ${edu.location}`}
                                  </p>
                                </div>
                                <div className="text-right text-gray-600">
                                  <div className="font-medium">{edu.graduationYear || "Year"}</div>
                                  {edu.gpa && <div>GPA: {edu.gpa}</div>}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {resumeData.skills.length > 0 && (
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">SKILLS</h2>
                        <div className="text-gray-700 leading-relaxed">{resumeData.skills.join(" • ")}</div>
                      </div>
                    )}

                    {/* Projects */}
                    {resumeData.projects.length > 0 && (
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">PROJECTS</h2>
                        <div className="space-y-4">
                          {resumeData.projects.map((project) => (
                            <div key={project.id}>
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {project.name || "Project Name"}
                                </h3>
                                {project.url && (
                                  <a
                                    href={project.url}
                                    className="text-blue-600 hover:underline font-medium"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    View Project
                                  </a>
                                )}
                              </div>
                              {project.description && (
                                <p className="text-gray-700 leading-relaxed mb-2">{project.description}</p>
                              )}
                              {project.technologies && (
                                <p className="text-gray-600">
                                  <strong>Technologies:</strong> {project.technologies}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
