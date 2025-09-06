"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye, Plus, Trash2, Save } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  summary: string
}

interface Experience {
  id: string
  position: string
  company: string
  startDate: string
  endDate: string
  description: string
}

interface Education {
  id: string
  degree: string
  school: string
  graduationDate: string
  gpa: string
}

interface Skill {
  id: string
  category: string
  skills: string
}

interface Project {
  id: string
  name: string
  description: string
  technologies: string
  date: string
}

export default function ResumeBuilderPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [isSaving, setIsSaving] = useState(false)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    summary: "",
  })
  const [experience, setExperience] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    loadResumeData()
  }, [])

  const loadResumeData = () => {
    const savedData = localStorage.getItem("resumeData")
    if (savedData) {
      const data = JSON.parse(savedData)
      setPersonalInfo(data.personalInfo || personalInfo)
      setExperience(data.experience || [])
      setEducation(data.education || [])
      setSkills(data.skills || [])
      setProjects(data.projects || [])
    }
  }

  const saveResumeData = async () => {
    setIsSaving(true)
    const resumeData = {
      personalInfo,
      experience,
      education,
      skills,
      projects,
    }

    localStorage.setItem("resumeData", JSON.stringify(resumeData))

    try {
      await fetch("/api/resume/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
      })
    } catch (error) {
      console.error("Failed to save resume:", error)
    }

    setIsSaving(false)
  }

  const downloadResume = async () => {
    const resumeData = {
      personalInfo,
      experience,
      education,
      skills,
      projects,
    }

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
        a.download = `resume-${personalInfo.firstName}-${personalInfo.lastName}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error("Failed to download resume:", error)
    }
  }

  const previewResume = () => {
    const resumeData = {
      personalInfo,
      experience,
      education,
      skills,
      projects,
    }
    localStorage.setItem("resumePreviewData", JSON.stringify(resumeData))
    router.push("/dashboard/resume/preview")
  }

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        id: Date.now().toString(),
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  const updateExperience = (id: string, field: string, value: string) => {
    setExperience(experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const removeExperience = (id: string) => {
    setExperience(experience.filter((exp) => exp.id !== id))
  }

  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: Date.now().toString(),
        degree: "",
        school: "",
        graduationDate: "",
        gpa: "",
      },
    ])
  }

  const updateEducation = (id: string, field: string, value: string) => {
    setEducation(education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id))
  }

  const addSkill = () => {
    setSkills([
      ...skills,
      {
        id: Date.now().toString(),
        category: "",
        skills: "",
      },
    ])
  }

  const updateSkill = (id: string, field: string, value: string) => {
    setSkills(skills.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)))
  }

  const removeSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id))
  }

  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now().toString(),
        name: "",
        description: "",
        technologies: "",
        date: "",
      },
    ])
  }

  const updateProject = (id: string, field: string, value: string) => {
    setProjects(projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)))
  }

  const removeProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  const tabs = [
    { id: "personal", label: "Personal", icon: "👤" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "projects", label: "Projects", icon: "🚀" },
  ]

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
            <div className="ml-auto flex items-center gap-2">
              <Button
                onClick={saveResumeData}
                disabled={isSaving}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button
                onClick={previewResume}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button onClick={downloadResume} className="bg-purple-600 hover:bg-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </header>

          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Header */}
              <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-800/50">
                <CardHeader>
                  <CardTitle className="text-white">Build Your Professional Resume</CardTitle>
                  <CardDescription className="text-gray-300">
                    Create an ATS-friendly resume that gets you noticed by employers
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Tabs */}
              <div className="flex space-x-1 bg-gray-900/50 p-1 rounded-lg border border-gray-800">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-purple-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  {activeTab === "personal" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="firstName" className="text-gray-300">
                            First Name *
                          </Label>
                          <Input
                            id="firstName"
                            value={personalInfo.firstName}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-gray-300">
                            Last Name *
                          </Label>
                          <Input
                            id="lastName"
                            value={personalInfo.lastName}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="email" className="text-gray-300">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={personalInfo.email}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-gray-300">
                            Phone *
                          </Label>
                          <Input
                            id="phone"
                            value={personalInfo.phone}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="location" className="text-gray-300">
                          Location *
                        </Label>
                        <Input
                          id="location"
                          value={personalInfo.location}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                          className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                          placeholder="San Francisco, CA"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="linkedin" className="text-gray-300">
                            LinkedIn
                          </Label>
                          <Input
                            id="linkedin"
                            value={personalInfo.linkedin}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                            placeholder="linkedin.com/in/johndoe"
                          />
                        </div>
                        <div>
                          <Label htmlFor="github" className="text-gray-300">
                            GitHub
                          </Label>
                          <Input
                            id="github"
                            value={personalInfo.github}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                            placeholder="github.com/johndoe"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="summary" className="text-gray-300">
                          Professional Summary
                        </Label>
                        <Textarea
                          id="summary"
                          value={personalInfo.summary}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                          className="bg-gray-800 border-gray-700 text-white focus:border-purple-500 min-h-[100px]"
                          placeholder="Write a brief professional summary highlighting your key skills and experience..."
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "experience" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Work Experience</h3>
                        <Button onClick={addExperience} className="bg-purple-600 hover:bg-purple-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Experience
                        </Button>
                      </div>
                      {experience.map((exp) => (
                        <Card key={exp.id} className="bg-gray-800/50 border-gray-700">
                          <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <Badge className="bg-purple-500/20 text-purple-400">Experience</Badge>
                              <Button
                                onClick={() => removeExperience(exp.id)}
                                variant="outline"
                                size="sm"
                                className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-gray-300">Position</Label>
                                <Input
                                  value={exp.position}
                                  onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                  placeholder="Software Engineer"
                                />
                              </div>
                              <div>
                                <Label className="text-gray-300">Company</Label>
                                <Input
                                  value={exp.company}
                                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                  placeholder="Tech Company Inc."
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-gray-300">Start Date</Label>
                                <Input
                                  type="month"
                                  value={exp.startDate}
                                  onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                />
                              </div>
                              <div>
                                <Label className="text-gray-300">End Date</Label>
                                <Input
                                  type="month"
                                  value={exp.endDate}
                                  onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                  placeholder="Leave empty if current"
                                />
                              </div>
                            </div>
                            <div>
                              <Label className="text-gray-300">Description</Label>
                              <Textarea
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                placeholder="Describe your responsibilities and achievements..."
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {activeTab === "education" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Education</h3>
                        <Button onClick={addEducation} className="bg-purple-600 hover:bg-purple-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Education
                        </Button>
                      </div>
                      {education.map((edu) => (
                        <Card key={edu.id} className="bg-gray-800/50 border-gray-700">
                          <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <Badge className="bg-blue-500/20 text-blue-400">Education</Badge>
                              <Button
                                onClick={() => removeEducation(edu.id)}
                                variant="outline"
                                size="sm"
                                className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-gray-300">Degree</Label>
                                <Input
                                  value={edu.degree}
                                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                  placeholder="Bachelor of Science in Computer Science"
                                />
                              </div>
                              <div>
                                <Label className="text-gray-300">School</Label>
                                <Input
                                  value={edu.school}
                                  onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                  placeholder="University of Technology"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-gray-300">Graduation Date</Label>
                                <Input
                                  type="month"
                                  value={edu.graduationDate}
                                  onChange={(e) => updateEducation(edu.id, "graduationDate", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                />
                              </div>
                              <div>
                                <Label className="text-gray-300">GPA (Optional)</Label>
                                <Input
                                  value={edu.gpa}
                                  onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                  placeholder="3.8"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {activeTab === "skills" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Skills</h3>
                        <Button onClick={addSkill} className="bg-purple-600 hover:bg-purple-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Skill Category
                        </Button>
                      </div>
                      {skills.map((skill) => (
                        <Card key={skill.id} className="bg-gray-800/50 border-gray-700">
                          <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <Badge className="bg-green-500/20 text-green-400">Skills</Badge>
                              <Button
                                onClick={() => removeSkill(skill.id)}
                                variant="outline"
                                size="sm"
                                className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div>
                              <Label className="text-gray-300">Category</Label>
                              <Input
                                value={skill.category}
                                onChange={(e) => updateSkill(skill.id, "category", e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                placeholder="Programming Languages"
                              />
                            </div>
                            <div>
                              <Label className="text-gray-300">Skills</Label>
                              <Input
                                value={skill.skills}
                                onChange={(e) => updateSkill(skill.id, "skills", e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                placeholder="JavaScript, Python, React, Node.js"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {activeTab === "projects" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Projects</h3>
                        <Button onClick={addProject} className="bg-purple-600 hover:bg-purple-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Project
                        </Button>
                      </div>
                      {projects.map((project) => (
                        <Card key={project.id} className="bg-gray-800/50 border-gray-700">
                          <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <Badge className="bg-orange-500/20 text-orange-400">Project</Badge>
                              <Button
                                onClick={() => removeProject(project.id)}
                                variant="outline"
                                size="sm"
                                className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-gray-300">Project Name</Label>
                                <Input
                                  value={project.name}
                                  onChange={(e) => updateProject(project.id, "name", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                  placeholder="E-commerce Platform"
                                />
                              </div>
                              <div>
                                <Label className="text-gray-300">Date</Label>
                                <Input
                                  type="month"
                                  value={project.date}
                                  onChange={(e) => updateProject(project.id, "date", e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                />
                              </div>
                            </div>
                            <div>
                              <Label className="text-gray-300">Description</Label>
                              <Textarea
                                value={project.description}
                                onChange={(e) => updateProject(project.id, "description", e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                placeholder="Describe the project and your contributions..."
                              />
                            </div>
                            <div>
                              <Label className="text-gray-300">Technologies Used</Label>
                              <Input
                                value={project.technologies}
                                onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                                placeholder="React, Node.js, MongoDB, AWS"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
