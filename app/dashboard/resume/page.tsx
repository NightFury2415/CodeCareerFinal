"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Eye, Plus, Trash2, Save, FileText } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ResumeBuilderPage() {
  const router = useRouter()
  const [resumeData, setResumeData] = useState({
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
  })

  const [activeTab, setActiveTab] = useState("personal")
  const [isLoading, setIsLoading] = useState(false)

  const updatePersonal = (field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }))
  }

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }))
  }

  const updateExperience = (id: number, field: string, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const removeExperience = (id: number) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      degree: "",
      school: "",
      location: "",
      graduationYear: "",
      gpa: "",
    }
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }))
  }

  const updateEducation = (id: number, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const removeEducation = (id: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const addSkill = (skill: string) => {
    if (!skill.trim()) return
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill.trim()],
    }))
  }

  const removeSkill = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: "",
      description: "",
      technologies: "",
      url: "",
    }
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }))
  }

  const updateProject = (id: number, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)),
    }))
  }

  const removeProject = (id: number) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((project) => project.id !== id),
    }))
  }

  const downloadResume = async () => {
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

  const saveResume = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/resume/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
      })

      if (response.ok) {
        alert("Resume saved successfully!")
      }
    } catch (error) {
      console.error("Failed to save resume:", error)
      alert("Failed to save resume. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const previewResume = () => {
    // Save to sessionStorage for preview
    sessionStorage.setItem("resumePreview", JSON.stringify(resumeData))
    router.push("/dashboard/resume/preview")
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
              <h1 className="text-xl font-semibold text-white">Resume Builder</h1>
            </div>
          </header>

          <div className="flex-1 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* Editor Panel */}
              <div className="space-y-6">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Build Your ATS-Friendly Resume</CardTitle>
                    <CardDescription className="text-gray-400">
                      Create a professional resume that passes Applicant Tracking Systems
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-5 bg-gray-900 border-gray-800">
                    <TabsTrigger
                      value="personal"
                      className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-purple-600"
                    >
                      Personal
                    </TabsTrigger>
                    <TabsTrigger
                      value="experience"
                      className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-purple-600"
                    >
                      Experience
                    </TabsTrigger>
                    <TabsTrigger
                      value="education"
                      className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-purple-600"
                    >
                      Education
                    </TabsTrigger>
                    <TabsTrigger
                      value="skills"
                      className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-purple-600"
                    >
                      Skills
                    </TabsTrigger>
                    <TabsTrigger
                      value="projects"
                      className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-purple-600"
                    >
                      Projects
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4">
                    <Card className="bg-gray-900/50 border-gray-800">
                      <CardContent className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                            <Input
                              value={resumeData.personal.firstName}
                              onChange={(e) => updatePersonal("firstName", e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                            <Input
                              value={resumeData.personal.lastName}
                              onChange={(e) => updatePersonal("lastName", e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                            <Input
                              type="email"
                              value={resumeData.personal.email}
                              onChange={(e) => updatePersonal("email", e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                              placeholder="john@example.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                            <Input
                              value={resumeData.personal.phone}
                              onChange={(e) => updatePersonal("phone", e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Location *</label>
                          <Input
                            value={resumeData.personal.location}
                            onChange={(e) => updatePersonal("location", e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                            placeholder="San Francisco, CA"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                            <Input
                              value={resumeData.personal.linkedin}
                              onChange={(e) => updatePersonal("linkedin", e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                              placeholder="linkedin.com/in/johndoe"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
                            <Input
                              value={resumeData.personal.github}
                              onChange={(e) => updatePersonal("github", e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                              placeholder="github.com/johndoe"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Professional Summary</label>
                          <Textarea
                            value={resumeData.personal.summary}
                            onChange={(e) => updatePersonal("summary", e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                            placeholder="Write a brief professional summary highlighting your key skills and experience..."
                            rows={4}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-4">
                    <Card className="bg-gray-900/50 border-gray-800">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-white">Work Experience</CardTitle>
                          <Button onClick={addExperience} size="sm" className="bg-purple-600 hover:bg-purple-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Experience
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {resumeData.experience.length === 0 ? (
                          <div className="text-center py-8 text-gray-400">
                            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No work experience added yet</p>
                            <p className="text-sm">Click "Add Experience" to get started</p>
                          </div>
                        ) : (
                          resumeData.experience.map((exp) => (
                            <div key={exp.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <Input
                                  value={exp.title}
                                  onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                  placeholder="Job Title *"
                                />
                                <Input
                                  value={exp.company}
                                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                  placeholder="Company *"
                                />
                              </div>
                              <div className="grid grid-cols-3 gap-4 mb-4">
                                <Input
                                  value={exp.location}
                                  onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                  placeholder="Location"
                                />
                                <Input
                                  type="month"
                                  value={exp.startDate}
                                  onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                />
                                <Input
                                  type="month"
                                  value={exp.current ? "" : exp.endDate}
                                  onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                  disabled={exp.current}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                  placeholder={exp.current ? "Present" : "End Date"}
                                />
                              </div>
                              <div className="mb-4">
                                <label className="flex items-center space-x-2 text-gray-300">
                                  <input
                                    type="checkbox"
                                    checked={exp.current}
                                    onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                                    className="rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
                                  />
                                  <span>I currently work here</span>
                                </label>
                              </div>
                              <Textarea
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white focus:border-purple-500 mb-4"
                                placeholder="• Describe your key responsibilities and achievements
• Use bullet points for better readability
• Include quantifiable results when possible"
                                rows={4}
                              />
                              <Button
                                onClick={() => removeExperience(exp.id)}
                                variant="outline"
                                size="sm"
                                className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove
                              </Button>
                            </div>
                          ))
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="education" className="space-y-4">
                    <Card className="bg-gray-900/50 border-gray-800">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-white">Education</CardTitle>
                          <Button onClick={addEducation} size="sm" className="bg-purple-600 hover:bg-purple-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Education
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {resumeData.education.length === 0 ? (
                          <div className="text-center py-8 text-gray-400">
                            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No education added yet</p>
                            <p className="text-sm">Click "Add Education" to get started</p>
                          </div>
                        ) : (
                          resumeData.education.map((edu) => (
                            <div key={edu.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <Input
                                  value={edu.degree}
                                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                  placeholder="Degree *"
                                />
                                <Input
                                  value={edu.school}
                                  onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                  placeholder="School *"
                                />
                              </div>
                              <div className="grid grid-cols-3 gap-4 mb-4">
                                <Input
                                  value={edu.location}
                                  onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                  placeholder="Location"
                                />
                                <Input
                                  value={edu.graduationYear}
                                  onChange={(e) => updateEducation(edu.id, "graduationYear", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                  placeholder="Graduation Year"
                                />
                                <Input
                                  value={edu.gpa}
                                  onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                  placeholder="GPA (Optional)"
                                />
                              </div>
                              <Button
                                onClick={() => removeEducation(edu.id)}
                                variant="outline"
                                size="sm"
                                className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove
                              </Button>
                            </div>
                          ))
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-4">
                    <Card className="bg-gray-900/50 border-gray-800">
                      <CardHeader>
                        <CardTitle className="text-white">Skills</CardTitle>
                        <CardDescription className="text-gray-400">
                          Add relevant skills that match the job description
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {resumeData.skills.map((skill, index) => (
                            <Badge
                              key={index}
                              className="bg-purple-500/20 text-purple-400 cursor-pointer hover:bg-purple-500/30"
                              onClick={() => removeSkill(index)}
                            >
                              {skill} ×
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a skill (e.g., JavaScript, Project Management)"
                            className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                addSkill(e.currentTarget.value)
                                e.currentTarget.value = ""
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-700 text-gray-300 bg-transparent hover:bg-gray-800"
                            onClick={(e) => {
                              const input = e.currentTarget.previousElementSibling as HTMLInputElement
                              addSkill(input.value)
                              input.value = ""
                            }}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500">
                          Tip: Include both technical and soft skills relevant to your target role
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="projects" className="space-y-4">
                    <Card className="bg-gray-900/50 border-gray-800">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-white">Projects</CardTitle>
                          <Button onClick={addProject} size="sm" className="bg-purple-600 hover:bg-purple-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Project
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {resumeData.projects.length === 0 ? (
                          <div className="text-center py-8 text-gray-400">
                            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No projects added yet</p>
                            <p className="text-sm">Click "Add Project" to showcase your work</p>
                          </div>
                        ) : (
                          resumeData.projects.map((project) => (
                            <div key={project.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                              <Input
                                value={project.name}
                                onChange={(e) => updateProject(project.id, "name", e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white focus:border-purple-500 mb-4"
                                placeholder="Project Name *"
                              />
                              <Textarea
                                value={project.description}
                                onChange={(e) => updateProject(project.id, "description", e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white focus:border-purple-500 mb-4"
                                placeholder="Describe the project, your role, and key achievements..."
                                rows={3}
                              />
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <Input
                                  value={project.technologies}
                                  onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                  placeholder="Technologies used (e.g., React, Node.js)"
                                />
                                <Input
                                  value={project.url}
                                  onChange={(e) => updateProject(project.id, "url", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                  placeholder="Project URL (Optional)"
                                />
                              </div>
                              <Button
                                onClick={() => removeProject(project.id)}
                                variant="outline"
                                size="sm"
                                className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove
                              </Button>
                            </div>
                          ))
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-4">
                  <Button
                    onClick={saveResume}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Saving..." : "Save Resume"}
                  </Button>
                  <Button
                    onClick={previewResume}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button onClick={downloadResume} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                    <Download className="w-4 h-4 mr-2" />
                    {isLoading ? "Generating..." : "Download PDF"}
                  </Button>
                </div>
              </div>

              {/* Live Preview Panel */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 border-b">
                  <h3 className="text-sm font-medium text-gray-700">Live Preview - ATS Optimized</h3>
                </div>
                <div className="p-8 overflow-y-auto max-h-screen">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="text-center border-b pb-4">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {resumeData.personal.firstName || "Your Name"} {resumeData.personal.lastName}
                      </h1>
                      <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
                        {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                        {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
                        {resumeData.personal.location && <span>{resumeData.personal.location}</span>}
                      </div>
                      {(resumeData.personal.linkedin || resumeData.personal.github) && (
                        <div className="flex flex-wrap justify-center gap-3 mt-1 text-sm text-blue-600">
                          {resumeData.personal.linkedin && <span>{resumeData.personal.linkedin}</span>}
                          {resumeData.personal.github && <span>{resumeData.personal.github}</span>}
                        </div>
                      )}
                    </div>

                    {/* Summary */}
                    {resumeData.personal.summary && (
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                          PROFESSIONAL SUMMARY
                        </h2>
                        <p className="text-gray-700 text-sm leading-relaxed">{resumeData.personal.summary}</p>
                      </div>
                    )}

                    {/* Experience */}
                    {resumeData.experience.length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                          PROFESSIONAL EXPERIENCE
                        </h2>
                        <div className="space-y-4">
                          {resumeData.experience.map((exp) => (
                            <div key={exp.id}>
                              <div className="flex justify-between items-start mb-1">
                                <div>
                                  <h3 className="font-semibold text-gray-900">{exp.title || "Job Title"}</h3>
                                  <p className="text-gray-700 text-sm">
                                    {exp.company || "Company Name"} {exp.location && `• ${exp.location}`}
                                  </p>
                                </div>
                                <span className="text-gray-600 text-sm">
                                  {exp.startDate} - {exp.current ? "Present" : exp.endDate || "End Date"}
                                </span>
                              </div>
                              {exp.description && (
                                <div className="text-gray-700 text-sm mt-2 whitespace-pre-line leading-relaxed">
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
                        <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                          EDUCATION
                        </h2>
                        <div className="space-y-2">
                          {resumeData.education.map((edu) => (
                            <div key={edu.id}>
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-gray-900">{edu.degree || "Degree"}</h3>
                                  <p className="text-gray-700 text-sm">
                                    {edu.school || "School Name"} {edu.location && `• ${edu.location}`}
                                  </p>
                                </div>
                                <div className="text-right text-sm text-gray-600">
                                  <div>{edu.graduationYear || "Year"}</div>
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
                        <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                          SKILLS
                        </h2>
                        <div className="text-gray-700 text-sm">{resumeData.skills.join(" • ")}</div>
                      </div>
                    )}

                    {/* Projects */}
                    {resumeData.projects.length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                          PROJECTS
                        </h2>
                        <div className="space-y-3">
                          {resumeData.projects.map((project) => (
                            <div key={project.id}>
                              <div className="flex justify-between items-start mb-1">
                                <h3 className="font-semibold text-gray-900">{project.name || "Project Name"}</h3>
                                {project.url && (
                                  <a
                                    href={project.url}
                                    className="text-blue-600 text-sm hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    View Project
                                  </a>
                                )}
                              </div>
                              {project.description && (
                                <p className="text-gray-700 text-sm leading-relaxed mb-1">{project.description}</p>
                              )}
                              {project.technologies && (
                                <p className="text-gray-600 text-sm">
                                  <strong>Technologies:</strong> {project.technologies}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Empty State */}
                    {!resumeData.personal.firstName &&
                      resumeData.experience.length === 0 &&
                      resumeData.education.length === 0 &&
                      resumeData.skills.length === 0 &&
                      resumeData.projects.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                          <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
                          <p className="text-lg mb-2">Your resume preview will appear here</p>
                          <p className="text-sm">Start filling out your information to see the live preview</p>
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
