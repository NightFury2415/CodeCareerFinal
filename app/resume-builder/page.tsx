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
import { Download, Eye, Plus, Trash2, Save, FileText, Sparkles } from "lucide-react"
import { useState } from "react"

export default function ResumeBuilderPage() {
  const [resumeData, setResumeData] = useState({
    personal: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe",
      website: "johndoe.dev",
      summary:
        "Experienced software engineer with 5+ years of experience building scalable web applications and leading cross-functional teams.",
    },
    experience: [
      {
        id: 1,
        title: "Senior Software Engineer",
        company: "Tech Company Inc.",
        location: "San Francisco, CA",
        startDate: "2021-01",
        endDate: "Present",
        current: true,
        description:
          "• Led development of microservices architecture serving 1M+ users\n• Improved system performance by 40% through optimization\n• Mentored 3 junior developers and conducted code reviews",
      },
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        school: "University of California, Berkeley",
        location: "Berkeley, CA",
        graduationYear: "2019",
        gpa: "3.8",
      },
    ],
    skills: {
      technical: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"],
      soft: ["Leadership", "Communication", "Problem Solving", "Team Collaboration"],
    },
    projects: [
      {
        id: 1,
        name: "E-commerce Platform",
        description:
          "Built a full-stack e-commerce platform using React, Node.js, and PostgreSQL. Implemented payment processing, inventory management, and admin dashboard.",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
        url: "https://github.com/johndoe/ecommerce",
      },
    ],
  })

  const [isGeneratingAI, setIsGeneratingAI] = useState(false)

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

  const addSkill = (category: "technical" | "soft", skill: string) => {
    if (!skill.trim()) return
    setResumeData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...prev.skills[category], skill.trim()],
      },
    }))
  }

  const removeSkill = (category: "technical" | "soft", index: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index),
      },
    }))
  }

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: "",
      description: "",
      technologies: [],
      url: "",
    }
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }))
  }

  const updateProject = (id: number, field: string, value: any) => {
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

  const generateAIContent = async (section: string) => {
    setIsGeneratingAI(true)
    try {
      const response = await fetch("/api/resume/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, currentData: resumeData }),
      })

      const data = await response.json()

      if (section === "summary") {
        updatePersonal("summary", data.content)
      }
      // Handle other sections as needed
    } catch (error) {
      console.error("Failed to generate AI content:", error)
    } finally {
      setIsGeneratingAI(false)
    }
  }

  const downloadPDF = () => {
    // This would integrate with a PDF generation service
    alert("PDF download functionality would be implemented here")
  }

  const saveResume = async () => {
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
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4">
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
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Build Your Resume</CardTitle>
                    <CardDescription className="text-gray-400">
                      Create an ATS-friendly resume that gets you noticed
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 bg-slate-800 border-slate-700">
                    <TabsTrigger value="personal" className="text-gray-300 data-[state=active]:text-white">
                      Personal
                    </TabsTrigger>
                    <TabsTrigger value="experience" className="text-gray-300 data-[state=active]:text-white">
                      Experience
                    </TabsTrigger>
                    <TabsTrigger value="education" className="text-gray-300 data-[state=active]:text-white">
                      Education
                    </TabsTrigger>
                    <TabsTrigger value="skills" className="text-gray-300 data-[state=active]:text-white">
                      Skills
                    </TabsTrigger>
                    <TabsTrigger value="projects" className="text-gray-300 data-[state=active]:text-white">
                      Projects
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4">
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardContent className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                            <Input
                              value={resumeData.personal.firstName}
                              onChange={(e) => updatePersonal("firstName", e.target.value)}
                              className="bg-slate-700 border-slate-600 text-white"
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                            <Input
                              value={resumeData.personal.lastName}
                              onChange={(e) => updatePersonal("lastName", e.target.value)}
                              className="bg-slate-700 border-slate-600 text-white"
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <Input
                              value={resumeData.personal.email}
                              onChange={(e) => updatePersonal("email", e.target.value)}
                              className="bg-slate-700 border-slate-600 text-white"
                              placeholder="john@example.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                            <Input
                              value={resumeData.personal.phone}
                              onChange={(e) => updatePersonal("phone", e.target.value)}
                              className="bg-slate-700 border-slate-600 text-white"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                            <Input
                              value={resumeData.personal.location}
                              onChange={(e) => updatePersonal("location", e.target.value)}
                              className="bg-slate-700 border-slate-600 text-white"
                              placeholder="San Francisco, CA"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                            <Input
                              value={resumeData.personal.linkedin}
                              onChange={(e) => updatePersonal("linkedin", e.target.value)}
                              className="bg-slate-700 border-slate-600 text-white"
                              placeholder="linkedin.com/in/johndoe"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
                            <Input
                              value={resumeData.personal.github}
                              onChange={(e) => updatePersonal("github", e.target.value)}
                              className="bg-slate-700 border-slate-600 text-white"
                              placeholder="github.com/johndoe"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                            <Input
                              value={resumeData.personal.website}
                              onChange={(e) => updatePersonal("website", e.target.value)}
                              className="bg-slate-700 border-slate-600 text-white"
                              placeholder="johndoe.dev"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-300">Professional Summary</label>
                            <Button
                              onClick={() => generateAIContent("summary")}
                              disabled={isGeneratingAI}
                              size="sm"
                              variant="outline"
                              className="border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent"
                            >
                              <Sparkles className="w-3 h-3 mr-1" />
                              {isGeneratingAI ? "Generating..." : "AI Generate"}
                            </Button>
                          </div>
                          <Textarea
                            value={resumeData.personal.summary}
                            onChange={(e) => updatePersonal("summary", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white"
                            placeholder="Write a brief professional summary..."
                            rows={4}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-4">
                    <Card className="bg-slate-800/50 border-slate-700">
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
                        {resumeData.experience.map((exp) => (
                          <div key={exp.id} className="p-4 bg-slate-700/50 rounded-lg">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <Input
                                value={exp.title}
                                onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                                className="bg-slate-600 border-slate-500 text-white"
                                placeholder="Job Title"
                              />
                              <Input
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                className="bg-slate-600 border-slate-500 text-white"
                                placeholder="Company"
                              />
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <Input
                                value={exp.location}
                                onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                                className="bg-slate-600 border-slate-500 text-white"
                                placeholder="Location"
                              />
                              <Input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                                className="bg-slate-600 border-slate-500 text-white"
                                placeholder="Start Date"
                              />
                              <Input
                                type="month"
                                value={exp.current ? "" : exp.endDate}
                                onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                disabled={exp.current}
                                className="bg-slate-600 border-slate-500 text-white"
                                placeholder="End Date"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="flex items-center space-x-2 text-gray-300">
                                <input
                                  type="checkbox"
                                  checked={exp.current}
                                  onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                                  className="rounded"
                                />
                                <span>I currently work here</span>
                              </label>
                            </div>
                            <Textarea
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                              className="bg-slate-600 border-slate-500 text-white mb-4"
                              placeholder="Describe your responsibilities and achievements..."
                              rows={3}
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
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="education" className="space-y-4">
                    <Card className="bg-slate-800/50 border-slate-700">
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
                        {resumeData.education.map((edu) => (
                          <div key={edu.id} className="p-4 bg-slate-700/50 rounded-lg">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <Input
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                className="bg-slate-600 border-slate-500 text-white"
                                placeholder="Degree"
                              />
                              <Input
                                value={edu.school}
                                onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                                className="bg-slate-600 border-slate-500 text-white"
                                placeholder="School"
                              />
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <Input
                                value={edu.location}
                                onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                                className="bg-slate-600 border-slate-500 text-white"
                                placeholder="Location"
                              />
                              <Input
                                value={edu.graduationYear}
                                onChange={(e) => updateEducation(edu.id, "graduationYear", e.target.value)}
                                className="bg-slate-600 border-slate-500 text-white"
                                placeholder="Graduation Year"
                              />
                              <Input
                                value={edu.gpa}
                                onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                                className="bg-slate-600 border-slate-500 text-white"
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
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-4">
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-white">Skills</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Technical Skills</label>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {resumeData.skills.technical.map((skill, index) => (
                              <Badge
                                key={index}
                                className="bg-blue-500/20 text-blue-400 cursor-pointer"
                                onClick={() => removeSkill("technical", index)}
                              >
                                {skill} ×
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add technical skill"
                              className="bg-slate-700 border-slate-600 text-white"
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  addSkill("technical", e.currentTarget.value)
                                  e.currentTarget.value = ""
                                }
                              }}
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-600 text-gray-300 bg-transparent"
                              onClick={(e) => {
                                const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                addSkill("technical", input.value)
                                input.value = ""
                              }}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Soft Skills</label>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {resumeData.skills.soft.map((skill, index) => (
                              <Badge
                                key={index}
                                className="bg-green-500/20 text-green-400 cursor-pointer"
                                onClick={() => removeSkill("soft", index)}
                              >
                                {skill} ×
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add soft skill"
                              className="bg-slate-700 border-slate-600 text-white"
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  addSkill("soft", e.currentTarget.value)
                                  e.currentTarget.value = ""
                                }
                              }}
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-600 text-gray-300 bg-transparent"
                              onClick={(e) => {
                                const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                addSkill("soft", input.value)
                                input.value = ""
                              }}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="projects" className="space-y-4">
                    <Card className="bg-slate-800/50 border-slate-700">
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
                        {resumeData.projects.map((project) => (
                          <div key={project.id} className="p-4 bg-slate-700/50 rounded-lg">
                            <Input
                              value={project.name}
                              onChange={(e) => updateProject(project.id, "name", e.target.value)}
                              className="bg-slate-600 border-slate-500 text-white mb-4"
                              placeholder="Project Name"
                            />
                            <Textarea
                              value={project.description}
                              onChange={(e) => updateProject(project.id, "description", e.target.value)}
                              className="bg-slate-600 border-slate-500 text-white mb-4"
                              placeholder="Project description and technologies used..."
                              rows={3}
                            />
                            <Input
                              value={project.url}
                              onChange={(e) => updateProject(project.id, "url", e.target.value)}
                              className="bg-slate-600 border-slate-500 text-white mb-4"
                              placeholder="Project URL (Optional)"
                            />
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
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-4">
                  <Button
                    onClick={saveResume}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Resume
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    onClick={downloadPDF}
                    variant="outline"
                    className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>

              {/* Live Preview Panel */}
              <div className="bg-white rounded-lg p-8 shadow-lg overflow-y-auto max-h-screen">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center border-b pb-4">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {resumeData.personal.firstName} {resumeData.personal.lastName}
                    </h1>
                    <div className="flex flex-wrap justify-center gap-4 mt-2 text-gray-600">
                      <span>{resumeData.personal.email}</span>
                      <span>{resumeData.personal.phone}</span>
                      <span>{resumeData.personal.location}</span>
                    </div>
                    {(resumeData.personal.linkedin || resumeData.personal.github || resumeData.personal.website) && (
                      <div className="flex flex-wrap justify-center gap-4 mt-1 text-sm text-blue-600">
                        {resumeData.personal.linkedin && <span>{resumeData.personal.linkedin}</span>}
                        {resumeData.personal.github && <span>{resumeData.personal.github}</span>}
                        {resumeData.personal.website && <span>{resumeData.personal.website}</span>}
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  {resumeData.personal.summary && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-200">
                        Professional Summary
                      </h2>
                      <p className="text-gray-700 text-sm leading-relaxed">{resumeData.personal.summary}</p>
                    </div>
                  )}

                  {/* Experience */}
                  {resumeData.experience.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200">Experience</h2>
                      <div className="space-y-4">
                        {resumeData.experience.map((exp) => (
                          <div key={exp.id}>
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h3 className="font-medium text-gray-900">{exp.title}</h3>
                                <p className="text-gray-600 text-sm">
                                  {exp.company} • {exp.location}
                                </p>
                              </div>
                              <span className="text-gray-500 text-sm">
                                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                              </span>
                            </div>
                            {exp.description && (
                              <div className="text-gray-700 text-sm mt-2 whitespace-pre-line">{exp.description}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {resumeData.education.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200">Education</h2>
                      <div className="space-y-2">
                        {resumeData.education.map((edu) => (
                          <div key={edu.id}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                                <p className="text-gray-600 text-sm">
                                  {edu.school} • {edu.location}
                                </p>
                              </div>
                              <div className="text-right text-sm text-gray-500">
                                <div>{edu.graduationYear}</div>
                                {edu.gpa && <div>GPA: {edu.gpa}</div>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200">Skills</h2>
                      {resumeData.skills.technical.length > 0 && (
                        <div className="mb-3">
                          <h3 className="font-medium text-gray-900 mb-1">Technical Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {resumeData.skills.technical.map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {resumeData.skills.soft.length > 0 && (
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Soft Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {resumeData.skills.soft.map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Projects */}
                  {resumeData.projects.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200">Projects</h2>
                      <div className="space-y-3">
                        {resumeData.projects.map((project) => (
                          <div key={project.id}>
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-medium text-gray-900">{project.name}</h3>
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
                            <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
                            {project.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {project.technologies.map((tech, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                    {tech}
                                  </span>
                                ))}
                              </div>
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
